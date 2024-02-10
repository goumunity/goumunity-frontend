import './GoumunityRanking.css'
const RankingBar = () => {
    


    return(
        <>
            <div className="rank font-daeam flex flex-col mt-10 items-center">
                <div className="text-2xl"> 거지 탈출 </div>
                <table className="m-20 table-auto bg-bg w-72 h-10 text-center">
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>닉네임</th>
                            <th>받은 좋아요 수</th>
                        </tr>
                    </thead>

                    <tbody id="rankList">
                        <tr className="hover:bg-gray-100 h-10">
                            <td>1</td>
                            <td>hello</td>
                            <td>12</td>
                        </tr>

                        
                    </tbody>


                </table>
            </div>
            
        </>
    )

}


export default RankingBar;