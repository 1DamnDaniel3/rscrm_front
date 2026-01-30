export {profileApi} from './api/profileApi' 
export { 
    default as profileReducer,
    selectProfile, selectSchoolProfiles, selectProfilesById, selectProfilesError, selectProfilesLoading, 
    fetchProfiles
} from './model/profileSlice'