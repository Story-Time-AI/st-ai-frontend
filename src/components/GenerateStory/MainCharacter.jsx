import React from "react";

const AvatarPickerForm = ({ avatars = [], register, setValue, errors }) => {
  const handleRedirect = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      // If no callback provided, you can handle navigation in parent component
      console.log("Navigate to character creator");
    }
  };

  const onCreateNew = ()=>{
    window.location.href = '/character-creator';
  }

  const handleAvatarSelect = (avatarId) => {
    setValue("selectedAvatar", avatarId);
  };

  const AddNewAvatarCard = ({ className = "" }) => (
    <div
      onClick={handleRedirect}
      className={`group relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] transition-all duration-200 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Add new avatar"
    >
      <svg 
        className="text-3xl sm:text-4xl text-slate-400 group-hover:text-blue-500 transition-colors duration-200 mb-2 w-8 h-8 sm:w-10 sm:h-10" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8m-4-4v8"/>
      </svg>
      <span  className="text-sm sm:text-base font-medium text-slate-600 group-hover:text-blue-600 text-center">
        Add New Avatar
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-4xl ">
      <div className="mb-6">
        <h2 className="text-md  font-bold text-gray-800 mb-2">
          Choose Your Main Character
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Select an avatar or create a new one to get started
        </p>
      </div>

      {avatars.length === 0 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <AddNewAvatarCard />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {avatars.map((avatar) => (
              <label
                key={avatar._id}
                className="group cursor-pointer  rounded-xl"
                onClick={() => handleAvatarSelect(avatar._id)}
              >
                <input
                  type="radio"
                  className="sr-only peer"
                  {...register("avatarId", {
                    required: "Please select a main character",
                  })}
                  value={avatar._id}
                />
                <div className="relative bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col items-center transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-md hover:border-gray-300 hover:shadow-sm min-h-[120px] sm:min-h-[140px]">
                  <div className="relative mb-3 flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-transparent peer-checked:border-blue-400 transition-all duration-200">
                      <img 
                        src={avatar.avatarUrl} 
                        alt={avatar.avatarName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900 peer-checked:text-blue-700">
                    {avatar.avatarName}
                  </span>
                </div>
              </label>
            ))}
            
            <AddNewAvatarCard />
          </div>

          {errors.avatarId && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">{errors.avatarId.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarPickerForm;