import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false); // 로그인/회원가입 상태 전환
  const navigate = useNavigate();

  const handleAuthSubmit = async (email, password) => {
    try {
      let userCredential;

      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('회원가입 성공!');
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert('로그인 성공!');
      }

      console.log('✅ 인증 성공:', userCredential.user);
      navigate('/'); // 인증 성공 후 메인 페이지로 이동
    } catch (error) {
      console.error('🔥 인증 오류:', error);
      alert(isSignup ? '회원가입 실패: ' + error.message : '로그인 실패: ' + error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>{isSignup ? '회원가입' : '로그인'} 페이지</h2>
      <AuthForm
        isSignup={isSignup}
        onSubmit={handleAuthSubmit}
        onToggle={() => setIsSignup(!isSignup)}
      />
    </div>
  );
};

export default LoginPage;
