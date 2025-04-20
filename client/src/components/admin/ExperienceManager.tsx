import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  getExperiences, 
  createExperience, 
  updateExperience, 
  deleteExperience,
  Experience as FirebaseExperience
} from '../../services/experienceService';
import { Timestamp } from 'firebase/firestore';

// Local interface for form handling
interface ExperienceForm {
  role: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  is_highlighted: boolean;
}

// Adapter function to convert Firebase Experience to our form model
const toFormModel = (experience: FirebaseExperience): ExperienceForm => {
  return {
    role: experience.role || '',
    company: experience.company || '',
    location: experience.location || '',
    start_date: experience.startDate ? new Date(experience.startDate.seconds * 1000).toISOString().split('T')[0] : '',
    end_date: experience.endDate ? new Date(experience.endDate.seconds * 1000).toISOString().split('T')[0] : '',
    description: experience.description || '',
    is_highlighted: experience.isHighlighted
  };
};

// Adapter function to convert our form model to Firebase Experience
const toFirebaseModel = (form: ExperienceForm): Omit<FirebaseExperience, 'id' | 'createdAt' | 'updatedAt'> => {
  return {
    role: form.role,
    company: form.company,
    location: form.location,
    startDate: Timestamp.fromDate(new Date(form.start_date)),
    endDate: form.end_date ? Timestamp.fromDate(new Date(form.end_date)) : null,
    isCurrentPosition: !form.end_date,
    description: form.description,
    isHighlighted: form.is_highlighted
  };
};

const ExperienceManager: React.FC = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<FirebaseExperience[]>([]);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExperienceForm>({
    role: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    description: '',
    is_highlighted: false
  });

  // Load experiences from Firebase
  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setIsLoading(true);
        const data = await getExperiences();
        setExperiences(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load experiences:', err);
        setError('Failed to load experiences. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadExperiences();
  }, []);

  const handleAddExperience = () => {
    setIsAddingExperience(true);
    setFormData({
      role: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      description: '',
      is_highlighted: false
    });
  };

  const handleEditExperience = (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (experience) {
      setIsEditingExperience(id);
      setFormData(toFormModel(experience));
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm(t('admin.experience.confirmDelete', 'Are you sure you want to delete this experience?'))) {
      try {
        await deleteExperience(id);
        setExperiences(experiences.filter(exp => exp.id !== id));
      } catch (err) {
        console.error('Failed to delete experience:', err);
        setError('Failed to delete experience. Please try again.');
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditingExperience) {
        const firebaseData = toFirebaseModel(formData);
        const updated = await updateExperience(isEditingExperience, firebaseData);
        setExperiences(experiences.map(exp => 
          exp.id === isEditingExperience ? updated : exp
        ));
        setIsEditingExperience(null);
      } else if (isAddingExperience) {
        const firebaseData = toFirebaseModel(formData);
        const created = await createExperience(firebaseData);
        setExperiences([...experiences, created]);
        setIsAddingExperience(false);
      }
      
      setFormData({
        role: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        is_highlighted: false
      });
      setError(null);
    } catch (err) {
      console.error('Failed to save experience:', err);
      setError('Failed to save experience. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsAddingExperience(false);
    setIsEditingExperience(null);
    setFormData({
      role: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      description: '',
      is_highlighted: false
    });
  };

  // Helper to format dates for display
  const formatDate = (dateString: string | Timestamp | null): string => {
    if (!dateString) return t('common.present', 'Present');
    
    if (dateString instanceof Timestamp) {
      const date = new Date(dateString.seconds * 1000);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    }
    
    // If it's YYYY-MM format, convert to Month Year format
    if (typeof dateString === 'string' && /^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
    }
    
    return typeof dateString === 'string' ? dateString : '';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.experience.title', 'Experience Manager')}</h2>
        <button
          onClick={handleAddExperience}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        >
          {t('admin.experience.addNew', 'Add New Experience')}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-white"></div>
        </div>
      ) : (
        <>
          {(isAddingExperience || isEditingExperience) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">
                {isEditingExperience 
                  ? t('admin.experience.editExperience', 'Edit Experience')
                  : t('admin.experience.addExperience', 'Add New Experience')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="role">
                      {t('admin.experience.experienceTitle', 'Experience Title')}
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="company">
                      {t('admin.experience.company', 'Company/Brand')}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="location">
                      {t('admin.experience.location', 'Location')}
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="start_date">
                      {t('admin.experience.startDate', 'Start Date')}
                    </label>
                    <input
                      type="date"
                      id="start_date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="end_date">
                      {t('admin.experience.endDate', 'End Date')} 
                      <span className="text-xs font-normal ml-1">({t('common.optional', 'Optional')})</span>
                    </label>
                    <input
                      type="date"
                      id="end_date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="description">
                    {t('admin.experience.description', 'Description')}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={4}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_highlighted"
                    name="is_highlighted"
                    checked={formData.is_highlighted}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_highlighted" className="ml-2 block text-sm">
                    {t('admin.experience.featured', 'Featured Experience')}
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t('common.cancel', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg shadow-sm text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    {isEditingExperience
                      ? t('admin.experience.update', 'Update Experience')
                      : t('admin.experience.add', 'Add Experience')}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">
              {t('admin.experience.experiences', 'Experiences')}
            </h3>
            
            {experiences.length === 0 ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-6 text-center rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  {t('admin.experience.noExperiences', 'No experiences added yet. Add your first experience above.')}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences.map(experience => (
                  <div 
                    key={experience.id}
                    className={`relative border rounded-lg overflow-hidden p-4 transition-colors ${
                      experience.isHighlighted ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-lg">{experience.role}</h3>
                        {experience.isHighlighted && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 mt-1">
                            {t('admin.experience.featuredBadge', 'Featured')}
                          </span>
                        )}
                        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {experience.company && <span>{experience.company}</span>}
                          {experience.company && experience.location && <span> • </span>}
                          {experience.location && <span>{experience.location}</span>}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(experience.startDate)} – {formatDate(experience.endDate)}
                        </div>
                        <p className="mt-2 text-sm">{experience.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditExperience(experience.id)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                          aria-label={t('admin.experience.edit', 'Edit')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(experience.id)}
                          className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                          aria-label={t('admin.experience.delete', 'Delete')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceManager; 