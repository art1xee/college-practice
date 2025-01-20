import { LoginForm } from "@/components/auth/login-form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/frontend/header-main";
import Footer from "@/components/frontend/footer";

const LoginPage = () => {
    return (
        <div className="bg-blue-200 min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center mt-8 mb-8"> {/* Отступы сверху и снизу */}
                <MaxWidthWrapper className="flex items-center justify-center">
                    <div className="w-full max-w-sm"> {/* Уменьшенная ширина */}
                        <LoginForm />
                    </div>
                </MaxWidthWrapper>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LoginPage;
