import "../styles/reset.css";
import styles from "../styles/LoginPage.module.css";
import { useLoginForm } from "../hooks/useLoginForm";
import { useState } from "react";

function LoginPage() {
    const { id, pw, onChangeId, onChangePw, resetForm } = useLoginForm();
    const [isLogin, setIsLogin] = useState(true); // true: 로그인, false: 회원가입

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id || !pw) {
            alert("아이디 및 비밀번호를 모두 입력해주세요");
            return;
        }

        if (isLogin) {
            console.log("로그인 시도:", { id, pw });
        } else {
            console.log("회원가입 시도:", { id, pw });
        }

        resetForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <h1 className={styles.title}>Fortune <br /> Cookie</h1>
                <img src="/images/logoimg.png" alt="" className={styles.logoImg} />
            </div>

            <div className={styles.loginContainer}>
                <p className={styles.login}>
                    {isLogin ? "로그인하고 운세를 확인해보세요!" : "회원가입 후 운세를 기록해보세요!"}
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="아이디"
                        className={styles.input}
                        value={id}
                        onChange={onChangeId}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className={styles.input}
                        value={pw}
                        onChange={onChangePw}
                    />

                    <button type="submit" className={styles.button}>
                        {isLogin ? "로그인" : "회원가입"}
                    </button>
                </form>

                <p className={styles.signup}>
                    {isLogin ? (
                        <>
                            아직 계정이 없으신가요?{" "}
                            <span className={styles.link} onClick={() => setIsLogin(false)}>
                                회원가입
                            </span>
                        </>
                    ) : (
                        <>
                            이미 계정이 있으신가요?{" "}
                            <span className={styles.link} onClick={() => setIsLogin(true)}>
                                로그인
                            </span>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
