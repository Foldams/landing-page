import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import NewsletterForm from "./NewsletterForm";
import { useState } from "react";

interface CountdownDialogProps {
  title: string;
  description: string;
  targetDate: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CountdownDialog({
  title,
  description,
  targetDate,
  isOpen,
  setIsOpen
}: CountdownDialogProps) {
  const [showNewsletter, setShowNewsletter] = useState(false);

  const handleNotifyClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShowNewsletter(true);
    }, 300); // Small delay to avoid dialog transition conflicts
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md flex flex-col items-center">
          <DialogHeader className="w-full text-center">
            <DialogTitle className="text-center text-xl font-bold">{title}</DialogTitle>
          </DialogHeader>
          <div className="p-4 md:p-6 w-full flex flex-col items-center">
            <p className="mb-6 text-center text-lg">{description}</p>
            <div className="w-full">
              <CountdownTimer targetDate={targetDate} />
            </div>
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={handleNotifyClick}
                className="bg-foldams-red hover:bg-opacity-90 text-white px-8 py-2"
              >
                Notify Me
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <NewsletterForm 
        isOpen={showNewsletter} 
        setIsOpen={setShowNewsletter} 
        title="Get notified when we launch"
        source={`countdown_${title.toLowerCase().replace(/\s+/g, '_')}`}
      />
    </>
  );
}