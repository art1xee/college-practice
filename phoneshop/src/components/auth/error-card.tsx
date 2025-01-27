import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
    return(
        <CardWrapper
         headerLabel="Ой! Щось пішло не так!"
         backButtonHref="/auth/login"
         backButtonLabel="Повернутися до входу"
        >
         <div className = "w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="text-destructive" />
         </div>
        </CardWrapper>
    )
}
