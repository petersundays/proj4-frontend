import { showErrorMessage } from "../Messages/ErrorMessage";
import { showSuccessMessage } from "../Messages/SuccessMessage";
import { showWarningMessage } from "../Messages/WarningMessage";

export const RegisterUser = async (event, newUser) => {

    event.preventDefault();

    const registerRequest = "http://localhost:8080/backend_proj4_war_exploded/rest/users/register";

        try {
            const response = await fetch(registerRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                showSuccessMessage('Registration successful');
                return true;
            } else if (response.status === 409) {
                showWarningMessage("Username already in use");
                return false;
            } else {
                const error = await response.text();
                showErrorMessage(error);
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            showErrorMessage("Something went wrong. Please try again later.");
            return false;
        }
}