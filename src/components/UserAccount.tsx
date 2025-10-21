import React, { useState, useEffect } from 'react';
import { X, User, Edit3, Save, Eye, EyeOff, MapPin, Phone, Mail, Lock } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { getUserProfile, updateUserProfile } from '../lib/api/auth';
import { notifyError, notifySuccess } from '../lib/toast';
import { useRouter } from 'next/navigation';

interface UpdateUserPayload {
  name?: string;
  phone?: string;
  password?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  createdAt?:string
}

interface UserAccountSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserAccountSidebar: React.FC<UserAccountSidebarProps> = ({
  isOpen,
  onClose
}) => {
  const router = useRouter()
  const { loading: profileLoading, error: profileError, run: runProfile, data: profileData } = useApi(getUserProfile);
  const { loading: updateProfileLoading, error: updateProfileError, run: runUpdateProfile } = useApi(updateUserProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load user profile when sidebar opens
  useEffect(() => {
    if (isOpen) {
      runProfile();
    }
  }, [isOpen, runProfile]);

  // Initialize form data when user data changes
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        phone: profileData.phone || '',
        password: '',
        confirmPassword: '',
        address: {
          street: profileData.address?.street || '',
          city: profileData.address?.city || '',
          state: profileData.address?.state || '',
          postalCode: profileData.address?.postalCode || '',
          country: profileData.address?.country || ''
        }
      });
    }
  }, [profileData]);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.replace('address.', '');
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const payload: UpdateUserPayload = {
        name: formData.name,
        phone: formData.phone || undefined,
        address: {
          street: formData.address.street || undefined,
          city: formData.address.city || undefined,
          state: formData.address.state || undefined,
          postalCode: formData.address.postalCode || undefined,
          country: formData.address.country || undefined
        }
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      await runUpdateProfile(payload);
      
      if (!updateProfileError) {
        notifySuccess('Profile updated successfully');
        setIsEditing(false);
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        runProfile();
      }
    } catch (error) {
      notifyError('Failed to update profile');
      console.error('Failed to update profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        phone: profileData.phone || '',
        password: '',
        confirmPassword: '',
        address: {
          street: profileData.address?.street || '',
          city: profileData.address?.city || '',
          state: profileData.address?.state || '',
          postalCode: profileData.address?.postalCode || '',
          country: profileData.address?.country || ''
        }
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const logOut = () =>{
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('token')
    router.push('/')
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-full shadow-2xl max-w-md bg-black border-l border-white/20 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* flare */}
        <div className="flare"></div>
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <User size={24} className="text-primary-200" />
              <h2 className="text-xl font-light text-white">My Account</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {profileLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-200"></div>
              </div>
            ) : !profileData ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <User size={64} className="text-gray-600 mb-4" />
                <h3 className="text-xl text-gray-400 mb-2">Not logged in</h3>
                <p className="text-gray-500 mb-6">Please log in to view your account</p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary-200 text-white rounded-full hover:bg-primary-300 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Profile Picture Placeholder */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-200 to-red-800/20 rounded-full flex items-center justify-center mb-3">
                    <User size={32} className="text-white" />
                  </div>
                  <h3 className="text-white text-lg font-medium">{profileData?.name}</h3>
                  <p className="text-gray-400 text-sm">{profileData?.email}</p>
                  <p className="text-gray-500 text-xs">Member since {formatDate(profileData?.createdAt)}</p>
                </div>

                {/* Edit Toggle */}
                <div className="flex justify-center">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-300 text-black rounded-full hover:bg-primary-300 transition-colors text-sm"
                    >
                      <Edit3 size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        disabled={updateProfileLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-200 text-white rounded-full hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
                      >
                        <Save size={16} />
                        {updateProfileLoading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <User size={16} className="text-primary-200" />
                      Personal Information
                    </h4>
                    <div className="space-y-3">
                      {/* Name */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Full Name</label>
                        {isEditing ? (
                          <div>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">{profileData.name}</p>
                        )}
                      </div>

                      {/* Email (readonly) */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Email</label>
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-500" />
                          <p className="text-gray-400 text-sm">{profileData.email}</p>
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Phone Number</label>
                        {isEditing ? (
                          <div>
                            <input
                              type="text"
                              value={formData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="Enter phone number"
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                            />
                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-500" />
                            <p className="text-gray-400 text-sm">{profileData.phone || 'Not provided'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Password Change */}
                  {isEditing && (
                    <div>
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <Lock size={16} className="text-primary-200" />
                        Change Password
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">New Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              placeholder="Leave blank to keep current password"
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-primary-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>
                        
                        {formData.password && (
                          <div>
                            <label className="block text-gray-300 text-sm mb-1">Confirm New Password</label>
                            <input
                              type={showPassword ? "text" : "password"}
                              value={formData.confirmPassword}
                              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                              placeholder="Confirm new password"
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                            />
                            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Address Information */}
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <MapPin size={16} className="text-primary-200" />
                      Address Information
                    </h4>
                    <div className="space-y-3">
                      {/* Street Address */}
                      <div>
                        <label className="block text-gray-300 text-sm mb-1">Street Address</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.address.street}
                            onChange={(e) => handleInputChange('address.street', e.target.value)}
                            placeholder="Enter street address"
                            className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                          />
                        ) : (
                          <p className="text-gray-400 text-sm">{profileData.address?.street || 'Not provided'}</p>
                        )}
                      </div>

                      {/* City and State */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">City</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.address.city}
                              onChange={(e) => handleInputChange('address.city', e.target.value)}
                              placeholder="City"
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                            />
                          ) : (
                            <p className="text-gray-400 text-sm">{profileData.address?.city || 'Not provided'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">State</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.address.state}
                              onChange={(e) => handleInputChange('address.state', e.target.value)}
                              placeholder="State"
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                            />
                          ) : (
                            <p className="text-gray-400 text-sm">{profileData.address?.state || 'Not provided'}</p>
                          )}
                        </div>
                      </div>

                      {/* Postal Code and Country */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Postal Code</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.address.postalCode}
                              onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                              placeholder="Postal Code"
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                            />
                          ) : (
                            <p className="text-gray-400 text-sm">{profileData.address?.postalCode || 'Not provided'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm mb-1">Country</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.address.country}
                              onChange={(e) => handleInputChange('address.country', e.target.value)}
                              placeholder="Country"
                              className="w-full border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-primary-200"
                            />
                          ) : (
                            <p className="text-gray-400 text-sm">{profileData.address?.country || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={logOut} className='text-black text-center bg-primary-200 rounded-full px-4 py-2 text-sm'>Log Out</button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-4 border-t border-white/20">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span>Your data is secure and encrypted</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccountSidebar;