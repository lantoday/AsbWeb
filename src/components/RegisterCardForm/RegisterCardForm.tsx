import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import * as styles from "./RegisterCardForm.module.scss";
import { AccountService } from "../../Account/AccountService";
import { CardModel } from "../../Models/CardModel";

interface FormState {
  isSubmittingInternal: boolean;
  submitError: string | null;
  submitSuccess: string | null;
  focusedField: string | null;
}

type FormAction =
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; payload: string }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "SET_FOCUS"; payload: string | null };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SUBMIT_START":
      return {
        ...state,
        isSubmittingInternal: true,
        submitError: null,
        submitSuccess: null,
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmittingInternal: false,
        submitSuccess: action.payload,
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmittingInternal: false,
        submitError: action.payload,
      };
    case "SET_FOCUS":
      return { ...state, focusedField: action.payload };
    default:
      return state;
  }
};

const initialState: FormState = {
  isSubmittingInternal: false,
  submitError: null,
  submitSuccess: null,
  focusedField: null,
};

export const RegisterCardForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CardModel>();

  const onSubmit = async (data: CardModel) => {
    dispatch({ type: "SUBMIT_START" });
    try {
      await AccountService.registerCard(data);
      dispatch({
        type: "SUBMIT_SUCCESS",
        payload: "Card registered successfully!",
      });
      reset();
    } catch (err: any) {
      dispatch({
        type: "SUBMIT_ERROR",
        payload: err.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div
      className={styles.container}
      data-testid="registration-form__container"
    >
      {state.submitError && (
        <div
          className={styles.submitError}
          data-testid="registration-form__submit-error"
        >
          {state.submitError}
        </div>
      )}
      {state.submitSuccess && (
        <div
          className={styles.submitSuccess}
          data-testid="registration-form__submit-success"
        >
          {state.submitSuccess}
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
              state.focusedField === "cardNumber"
                ? "0000 0000 0000 0000"
                : "Credit card number"
            }
            onFocus={() =>
              dispatch({ type: "SET_FOCUS", payload: "cardNumber" })
            }
            onBlur={(e) => {
              register("cardNumber").onBlur(e);
              dispatch({ type: "SET_FOCUS", payload: null });
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
              placeholder={state.focusedField === "cvc" ? "000" : "CVC"}
              onFocus={() => dispatch({ type: "SET_FOCUS", payload: "cvc" })}
              onBlur={(e) => {
                register("cvc").onBlur(e);
                dispatch({ type: "SET_FOCUS", payload: null });
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
              placeholder={state.focusedField === "expiry" ? "MM/YY" : "Expiry"}
              onFocus={() => dispatch({ type: "SET_FOCUS", payload: "expiry" })}
              onBlur={(e) => {
                register("expiry").onBlur(e);
                dispatch({ type: "SET_FOCUS", payload: null });
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
          disabled={state.isSubmittingInternal}
        >
          {state.isSubmittingInternal ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
