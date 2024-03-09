import { useEffect, useState } from 'react';
import instance from '@/utils/instance'

function MemberListSelectBox({ widthSize, color, defaultValue, members, ...props }) {
    return (
        <select
            className={`px-2 py-1 bg-${color} rounded-md border-solid border-2 border-black font-daeam text-lg w-${widthSize}`}
            // defaultValue={defaultValue}
            {...props}
        >
            <option value='none'>회원 목록</option>
            {members?.map((member) => {
                return (
                    <option key={member.userId} value={member.userId} selected={defaultValue === member.userId}>
                        <img src={member.profileImageSrc}/>{member.nickname}
                    </option>
                );
            })}
        </select>
    );
}

export default MemberListSelectBox;
