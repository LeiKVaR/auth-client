import { useState, useEffect } from "react";
import { profileService } from "../services/profileServices";

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const userProfile = await profileService.getProfile();
            setProfile(userProfile);
        } catch (err) {
            setError(err.response?.data?.message || "Error al cargar el perfil");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const updateProfile = async (profileData) => {
        try {
            setLoading(true);
            const updatedProfile = await profileService.updateProfile(profileData);
            setProfile(updatedProfile);
            return { success: true };
        } catch (err) {
            const errorMsg =
                err.response?.data?.message || "Error al actualizar el perfil";
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        loading,
        error,
        refetch: fetchProfile,
        updateProfile,
    };
};
