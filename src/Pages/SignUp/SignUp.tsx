import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { clearError, registerUser } from "../../store/user.slice";

const SignUp = () => {

    const dispatch = useAppDispatch()
    const { error, token } = useAppSelector((state) => state.user)
    // const { error, status, token } = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    // const { state } = useLocation()

    useEffect(() => {
        if (!error && token) {
            navigate('/')
        }
    }, [error, token])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(clearError())
        const formFields = e.target as HTMLFormElement
        const formData = new FormData(formFields)
        const data = Object.fromEntries(formData) as { name: string, email: string, password: string }

        registration(data)
    }

    const registration = async (formData: { name: string, email: string, password: string }) => {
        dispatch(registerUser(formData))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <Input appearance="big" name="name" placeholder="Name" labelName="name" />
                <Input appearance="big" name="email" placeholder="Email" type="email" labelName="email" />
                <Input appearance="big" name="password" placeholder="Password" type='password' labelName="password" />
                <Button appearance='small' className={'button'}>Регистрация</Button>
                <div>Есть аккаунт?</div>
                <Link to={'/auth/signin'} style={{ color: "blue" }}>
                    Авторизоваться
                </Link>
            </form>
        </div>
    );
}

export default SignUp;