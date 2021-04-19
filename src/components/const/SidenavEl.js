import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

export const elementList = [
  {
    id: 1,
    active: true,
    route: "/dashboard",
    text: "Панель приборов",
    badge: false,
    icon: faTachometerAlt,
  },
  {
    id: 2,
    active: false,
    route: "/create-order",
    text: "Создать заявку",
    badge: false,
    icon: faTag,
  },
  {
    id: 3,
    active: false,
    route: "/orders",
    text: "Список заявок",
    badge: true,
    icon: faListAlt,
  },
  {
    id: 5,
    active: false,
    route: "/help",
    text: "Центр знаний",
    badge: false,
    icon: faGraduationCap,
  },
];
