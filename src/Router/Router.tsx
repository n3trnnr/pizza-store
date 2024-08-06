import { createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
// import Menu from "../Pages/Menu/Menu" //При lazy компронент подгружается через import()
import Product from "../components/Product/Product";
import Cart from "../Pages/Cart/Cart";
import { PREFIX } from "../constants/constants";
import { lazy, Suspense } from "react";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SingIn/SignIn";
import Auth from "../hoc/Auth";
import Success from "../Pages/Success/Success";

//Ленивая подгрузка компонентов, название переменной должно соответствовать компоненту.
//Компонент должен экспортироваться черезе export default
//Lazy компоненты используются с Suspense
//Suspense можно исползовать вместе loading в самом компоненте при ожидании получения данных
const Menu = lazy(() => import('../Pages/Menu/Menu'))
const Delivery = lazy(() => import('../Pages/Delivery/Delivery'))

const Router = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/auth' element={<AuthLayout />}>
                    <Route path="signup" element={<SignUp />} />
                    <Route path="signin" element={<SignIn />} />
                </Route>

                <Route path="/" element={<Auth><Layout /></Auth>} >
                    <Route index element={
                        //Первый вариант реализации прелоадера
                        <Suspense fallback={<div>Загрузка или компонент со скелетоном</div>}>
                            <Menu />
                        </Suspense>}
                    />
                    <Route path="cart" element={<Cart />} />
                    <Route
                        path="/product/:id"
                        element={<Product />}

                        //Запрос данных по id полученный из params, подходит для получения конкретных данный, но не для фильтрации.
                        // loader={async ({ params }) => {
                        //     const res = await fetch(`${PREFIX}/menu/${params.id}`)
                        //     if (!res.ok) {
                        //         throw new Error('ошибка запроса')
                        //     }
                        //     const data = await res.json()
                        //     return data
                        // }}

                        //--------------------------------------------------------------------------------------------------------

                        loader={async ({ request, params }) => {
                            console.log('loader request', request);

                            //Данный способ запроса данных плохо работает с Suspense, т.к. данные ожидаются в функции запроса, и приходят в <Await> практически мгновенно
                            // const data = await fetch(`${PREFIX}/menu/${params.id}`)
                            // if (!res.ok) {
                            // throw new Error('ошибка запроса')
                            // }
                            // const data = res.json()

                            //--------------------------------------------------------------------------------------------------------

                            // Второй вариант реализации прелоадера, если не использовать await загрузка в Suspense будет дольше
                            const data = fetch(`${PREFIX}/menu/${params.id}`).then(data => data.json())

                            // Третий вариант реализации прелоадера
                            // const data = new Promise(async (resolve, reject) => {
                            //     const fetchData = await fetch(`${PREFIX}/menu/${params.id}`)
                            //     console.log('fetchData', fetchData);
                            //     if (!fetchData.ok) {
                            //         reject(new Error('Ошибка запроса fetch data'))
                            //     }
                            //     resolve(fetchData.json())
                            // })

                            return defer({ data }) //Возврат данных из loader возвращается через defer
                        }}
                        errorElement={< ErrorPage />}
                    />
                    <Route path='delivery' element={<Suspense fallback={<div>Идет загрузка данных...</div>}><Delivery /></Suspense>} />
                    <Route path='success' element={<Success />} />
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </>
        ))

    return <RouterProvider router={router} />
}

export default Router;