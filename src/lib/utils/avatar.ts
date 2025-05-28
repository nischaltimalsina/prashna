export const getAvatarUrl = (gender: "male" | "female"| "other"| "prefer-not-to-say"): string => {
  switch (gender) {
    case "male":
      return "/assets/avatars/male.svg";
    case "female":
      return "/assets/avatars/female.svg";
    case "prefer-not-to-say":
      return "/assets/avatars/prefernot.svg";
    case "other":
      return "/assets/avatars/other.svg";
    default:
      return "/assets/avatars/prefernot.svg";
  }
};
