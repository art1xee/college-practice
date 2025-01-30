import { Card, CardContent } from "../ui/card";

interface ContactSeller {
  name: string;
  email: string;
  number?: string;
}

export const ContactSeller = ({ name, email, number }: ContactSeller) => {
  return (
    <Card className="h-40 flex items-center justify-center"> {/* Ensure height & centering */}
      <CardContent className="flex flex-col items-center justify-center text-center h-full w-full">
        <h3 className="font-medium">Ім'я: {name}</h3>
        <h3 className="font-medium">Емейл: {email}</h3>
        <h3 className="font-medium">Номер телефону: {number}</h3>
      </CardContent>
    </Card>
  );
};
