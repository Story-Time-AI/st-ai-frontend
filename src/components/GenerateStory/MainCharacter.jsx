import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const AvatarPickerForm = ({ avatars, register, setValue, errors }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/character-creator");
  };

  // Handle avatar selection directly without a separate submission
  const handleAvatarSelect = (avatarId) => {
    setValue("selectedAvatar", avatarId);
  };

  return (
    <>
      <div>
        <h2 className="text-md text-gray-600 font-bold mb-2">
          Choose Your Main Character
        </h2>

        {avatars.length === 0 && (
          <div
            onClick={handleRedirect}
            className="flex text-sm md:text-md font-medium justify-center cursor-pointer items-center flex-col shadow-sm hover:shadow-md rounded-sm"
          >
            Add New Avatar{" "}
            <CiCirclePlus className="md:text-3xl mt-1 text-xl text-deepPurple cursor-pointer" />
          </div>
        )}

        {avatars.length !== 0 && (
          <>
            <div className="grid md:grid-cols-6 grid-cols-3 md:gap-4 gap-2">
              {avatars.map((avatar) => (
                <label
                  key={avatar._id}
                  className="cursor-pointer"
                  onClick={() => handleAvatarSelect(avatar._id)}
                >
                  <input
                    type="radio"
                    className="peer hidden"
                    {...register("avatarId", {
                      required: "Please select a main character",
                    })}
                    // Set the value to the avatar's unique ID
                    value={avatar._id}
                  />
                  <div className="border rounded p-2 flex flex-col items-center peer-checked:border-primary transition-all">
                    <div className="avatar">
                      <div className="w-12 rounded">
                        <img src={avatar.avatarUrl} alt={avatar.avatarName} />
                      </div>
                    </div>
                    <span className="text-sm mt-1">{avatar.avatarName}</span>
                  </div>
                </label>
              ))}
              <div
                onClick={handleRedirect}
                className="flex text-sm md:textmd font-medium justify-center cursor-pointer items-center flex-col shadow-sm hover:shadow-md rounded-sm"
              >
                Add New Avatar{" "}
                <CiCirclePlus className="md:text-3xl mt-1 text-xl text-deepPurple cursor-pointer" />
              </div>
            </div>
            {errors.avatarId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.avatarId.message}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AvatarPickerForm;
