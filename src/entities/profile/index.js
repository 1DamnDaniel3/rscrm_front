export {profileApi} from './api/profileApi' 
export { 
    default as profileReducer,
    selectProfile, selectSchoolProfiles, selectProfilesError, selectProfilesLoading, 
    fetchProfiles
} from './model/profileSlice'