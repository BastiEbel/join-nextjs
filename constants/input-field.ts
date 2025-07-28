import personIcon from "@/public/images/person.png";
import mailIcon from "@/public/images/mail.png";
import lockIcon from "@/public/images/lock.png";

import type { StaticImageData } from "next/image";

type InputProp = {
  icon: StaticImageData;
  placeholder: string;
  type: string;
  name: string;
  error?: string;
};

export const inputFields: InputProp[] = [
  {
    icon: personIcon,
    placeholder: "Name",
    type: "text",
    name: "name",
  },
  {
    icon: mailIcon,
    placeholder: "Email",
    type: "email",
    name: "email",
  },
  {
    icon: lockIcon,
    placeholder: "Password",
    type: "password",
    name: "password",
  },
  {
    icon: lockIcon,
    placeholder: "Confirm Password",
    type: "password",
    name: "confirmPassword",
  },
];
