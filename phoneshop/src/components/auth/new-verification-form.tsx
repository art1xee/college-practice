"use client";

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "../../../actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
        setError("Missing token!");
        return;
    }

    newVerification(token)
    .then((data) => {
        setSuccess(data.success);
        setError(data.error);
    })
    .catch(() => {
        setError("Something went wrong!");
    })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

    return (
        <CardWrapper 
        headerLabel="Підтвердження вашої верифікації"
        backButtonLabel="Повернутися до входу"
        backButtonHref="/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error}
                    <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    );
}