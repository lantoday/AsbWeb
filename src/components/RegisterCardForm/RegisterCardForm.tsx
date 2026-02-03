import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as styles from "./RegisterCardForm.module.scss";
import { AccountService } from "../../Account/AccountService";

interface IFormInput {
  cardNumber: string;
  cvc: string;
  expiry: string;
}

export const RegisterCardForm: React.FC = () => {
  const [isSubmittingInternal, setIsSubmittingInternal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    setIsSubmittingInternal(true);
    try {
      await AccountService.registerCard(data);

      setSubmitSuccess("Card registered successfully!");
      reset();
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmittingInternal(false);
    }
  };

  return (
    <div
      className={styles.container}
      data-testid="registration-form__container"
    >
      {submitError && (
        <div
          className={styles.submitError}
          data-testid="registration-form__submit-error"
        >
          {submitError}
        </div>
      )}
      {submitSuccess && (
        <div
          className={styles.submitSuccess}
          data-testid="registration-form__submit-success"
        >
          {submitSuccess}
        </div>
      )}
      <form
        className={styles.form}
        data-testid="registration-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.field}>
          <input
            type="text"
            id="cardNumber"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{16}$/,
                message: "Card number must be 16 digits",
              },
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16);
              },
            })}
            placeholder={
              focusedField === "cardNumber"
                ? "0000 0000 0000 0000"
                : "Credit card number"
            }
            onFocus={() => setFocusedField("cardNumber")}
            onBlur={(e) => {
              register("cardNumber").onBlur(e);
              setFocusedField(null);
            }}
            data-testid="registration-form__input-card-number"
          />
          {errors.cardNumber && (
            <span className={styles.error}>{errors.cardNumber.message}</span>
          )}
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <input
              type="text"
              id="cvc"
              {...register("cvc", {
                required: "CVC is required",
                pattern: {
                  value: /^\d{3,4}$/,
                  message: "CVC must be 3 or 4 digits",
                },
                onChange: (e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);
                },
              })}
              placeholder={focusedField === "cvc" ? "000" : "CVC"}
              onFocus={() => setFocusedField("cvc")}
              onBlur={(e) => {
                register("cvc").onBlur(e);
                setFocusedField(null);
              }}
              data-testid="registration-form__input-cvc"
            />
            {errors.cvc && (
              <span className={styles.error}>{errors.cvc.message}</span>
            )}
          </div>
          <div className={styles.field}>
            <input
              type="text"
              id="expiry"
              {...register("expiry", {
                required: "Expiry date is required",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Expiry must be MM/YY",
                },
              })}
              placeholder={focusedField === "expiry" ? "MM/YY" : "Expiry"}
              onFocus={() => setFocusedField("expiry")}
              onBlur={(e) => {
                register("expiry").onBlur(e);
                setFocusedField(null);
              }}
              data-testid="registration-form__input-expiry"
            />
            {errors.expiry && (
              <span className={styles.error}>{errors.expiry.message}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          data-testid="registration-form__button-submit"
          disabled={isSubmittingInternal}
        >
          {isSubmittingInternal ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
