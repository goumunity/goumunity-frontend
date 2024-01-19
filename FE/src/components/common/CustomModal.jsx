import React, { useEffect, useRef } from "react";
import CloseButton from './closeButton';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';

function CustomModal({ children }) {
  const modalRef = useRef();
  const dispatch = useDispatch();
  
  // 마우스 왼쪽버튼 down 했을 때 clickOutside 함수 실행
  useEffect(function addClickOutside() {
    // component가 생성 시 mousedown 이벤트에 clickOutside 함수 추가
    document.addEventListener("mousedown", closeModalWithClickOutside);

    return () => {
      // component가 해제 시 mousedown 이벤트에서 clickOutside 함수 제거
      document.removeEventListener("mousedown", closeModalWithClickOutside);
    };
  });

  // 모달 바깥을 클릭했을 때 닫기
  const closeModalWithClickOutside = (e) => {
    if (!modalRef.current.contains(e.target)) {
      // closeJoinModal();
      dispatch(modalActions.closeModal());
    }
  };

  // x눌렀을 때 모달 닫기
  const closeModal = () => {
    dispatch(modalActions.closeModal());
  }

  return (
    <svg
      className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg"
      width="467px"
      height="575px"
      viewBox="0 0 467 575"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={modalRef}
    >
      <rect
        width="465"
        height="574"
        transform="translate(1 1)"
        fill="url(#paint0_linear_216_378)"
      />
      <path
        d="M466 569.766L3.48375 572.604M464.658 572.648L3.59173 572.778M2.86638 6.53682C0.0313426 210.417 0.0616307 392.467 5.51553 572.843M4.35146 6.43414C166.921 1.30094 332.638 0.784455 463.848 2.65624L4.35146 6.43414ZM460.988 1C469.225 171.309 462.962 344.182 465.631 575L460.988 1Z"
        stroke="black"
        strokeWidth="0.880362"
      />
      <defs>
        <linearGradient
          id="paint0_linear_216_378"
          x1="232.5"
          y1="0"
          x2="232.5"
          y2="574"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFBF0" />
          <stop offset="0.26" stopColor="#FFFBF0" stopOpacity="0.94" />
          <stop offset="1" stopColor="#FFFBF0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <foreignObject className="w-full h-full px-8 py-10 flex-col justify-center items-center text-center">
          <div className="flex justify-end cursor-pointer" onClick={closeModal}>
            {/* <CloseButton onClick={closeJoinModal} /> */}
            <CloseButton />
          </div>
          {children}
      </foreignObject>
    </svg>
  );
}

export default CustomModal;
