import AuthForm from "./AuthForm";

function regPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AuthForm type="Register" />
    </div>
  );
}
export default regPage;
