import { Card } from "../../../components/commons/Card";
import { LoginForm } from "../../../components/Forms/LoginForm";
import { Layout } from "../../../components/Layout";

const LoginPage = () => {
  return (
    <Layout pageTitle="Login to Perfectionist">
      <div className="mx-auto w-1/2">
        <Card>
          <LoginForm />
        </Card>
      </div>
    </Layout>
  );
};

export default LoginPage;
