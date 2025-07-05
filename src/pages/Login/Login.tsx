import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AFForm from "../../Form/AFForm";
import AFInput from "../../Form/AFInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 1000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (err) {
      if (err) {
        toast.error("Something went wrong", { id: toastId, duration: 1000 });
      }
    }
  };
  return (
    <Row style={{ height: "100vh" }} justify={"center"} align={"middle"}>
      <AFForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <div
          style={{
            padding: "20px",
            border: "1px solid",
            borderColor: "green",
            borderRadius: "10px",
          }}>
          <AFInput type="text" name="userId" label="ID:" />
          <AFInput type="text" name="password" label="Password:" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Button htmlType="submit">Login</Button>
          </div>
        </div>
      </AFForm>
    </Row>
  );
};

export default Login;
