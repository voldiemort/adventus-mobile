import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string,
    password: string
};

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        </form>
    )
}