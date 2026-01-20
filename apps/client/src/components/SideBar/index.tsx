import TeamBar from "./TeamBar";
import NavigationBar from "./NavigationBar";
import { useState } from "react";
import { PanelRightClose } from "lucide-react";

const Index = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-full">
      <div className="flex h-full">
        <TeamBar toggle={toggle} isOpen={isOpen} />
        {isOpen && <NavigationBar toggle={toggle} />}
      </div>
    </div>
  );
};

export default Index;
