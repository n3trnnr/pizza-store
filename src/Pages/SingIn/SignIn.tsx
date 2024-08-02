import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { FormEvent, useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { clearError, loginUser } from "../../store/user.slice";
// import { clearError, clearStatus, loginUser } from "../../store/user.slice";

const SignIn = () => {
    const dispatch = useAppDispatch()
    const { error, token } = useAppSelector((state) => state.user)
    // const { error, token, status } = useAppSelector((state) => state.user)
    const navigate = useNavigate()
    // const { state } = useLocation()

    useEffect(() => {
        if (!error && token) {
            // dispatch(clearStatus())
            navigate('/')
        }
    }, [error, token])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(clearError())
        const formFields = e.target as HTMLFormElement
        const formData = new FormData(formFields)
        const data = Object.fromEntries(formData) as { email: string, password: string }

        login(data)

    }

    const login = async (formData: { email: string, password: string }) => {
        dispatch(loginUser(formData))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <h2>Войти</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <Input appearance="big" placeholder="Email" name="email" labelName="email" />
                <Input appearance="big" placeholder="Password" name="password" type='password' labelName="password" />
                <Button appearance='small' className={'button'}>Войти</Button>
                <div>Нет аккаунта?</div>
                <Link to={'/auth/signup'} style={{ color: "blue" }}>
                    Зарегистрироваться
                </Link>
            </form>
        </div>
    );
}

export default SignIn;