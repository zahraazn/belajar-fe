import { Button } from "@/components/ui/button";
import { Browser, Envelope } from "@phosphor-icons/react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";



const navItems = [
  {
    title: "Website",
    icon: <Browser />,
    router:"/admin/website",
  },
  {
    title: "Department",
    icon: <User size={16} />,
    router:"/admin/owner",
  },
  {
    title: "Letter",
    icon: <Envelope />,
    router:"/admin/letter",
  },
];

const Navbar = () => {
    const router = useRouter();
    const handleNavigation = ( link:string) => {
        router.push(link); 
    }
  return (
    <div>
      {navItems.map((item, index) => (
        <Button
          key={index}
          onClick={() =>  handleNavigation(item.router)}
          className="flex items-center gap-2 bg-transparent text-black font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-gradient-to-r  from-[#324A5F] to-[#CCC9DC] transition-transform duration-300"
        >
          {item.icon}
          <span className="ml-2">{item.title}</span>
        </Button>
      ))}
    </div>
  );
};

export default Navbar;
