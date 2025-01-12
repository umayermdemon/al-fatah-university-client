/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "A-0001",
      password: "admin123",
    },
  });

  const [login] = useLoginMutation();

  const onsubmit = async (data: any) => {
    const userInfo = {
      id: data.userId,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const decode = verifyToken(res.data.accessToken);
    dispatch(setUser({ user: decode, token: res?.data?.accessToken }));
    console.log(decode, userInfo);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
      }}>
      <form
        onSubmit={handleSubmit(onsubmit)}
        style={{
          border: "2px solid",
          borderColor: "blue",
          borderRadius: "10px",
          padding: "20px",
        }}>
        <div style={{ paddingBottom: "5px" }}>
          <label htmlFor="id">ID: </label>
          <br />
          <input
            type="text"
            id="id"
            {...register("userId")}
            style={{
              padding: "5px",
              borderRadius: "8px",
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="text"
            id="password"
            {...register("password")}
            style={{
              padding: "5px",
              borderRadius: "8px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            htmlType="submit"
            style={{
              marginTop: "5px",
            }}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
