import { useQuery } from "@tanstack/react-query";
import { getUserProfile, getUserFavorites, getUserWatched, getUserReviews } from "../services/userService";

export function useUserProfile(userId: number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserProfile(userId).then((res) => res.data.data),
  });
}

export function useUserFavorites(userId: number) {
  return useQuery({
    queryKey: ["user", userId, "favorites"],
    queryFn: () => getUserFavorites(userId).then((res) => res.data.data),
  });
}

export function useUserWatched(userId: number) {
  return useQuery({
    queryKey: ["user", userId, "watched"],
    queryFn: () => getUserWatched(userId).then((res) => res.data.data),
  });
}

export function useUserReviews(userId: number) {
  return useQuery({
    queryKey: ["user", userId, "reviews"],
    queryFn: () => getUserReviews(userId).then((res) => res.data),
  });
}