import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/auth/useAuthStore";

const team = [1, 2, 3, 4, 5, 6, 7, 8];

const Index = () => {
  const user = useAuthStore();
  const navigator = useNavigate();
  return (
    <div className="h-full">
      <div className="flex h-full">
        <div className="bg-amber-100 w-[73px] flex flex-col gap-2">
          <div className="h-[80px] bg-pink-300">상단 공백</div>
          {team.map((team) => (
            <div
              key={team}
              className={
                "bg-blue-500 flex items-center justify-center pt-[10px] pb-[10px]"
              }
            >
              <div className="w-[32px] h-[32px] rounded-[8px] bg-amber-200 flex items-center justify-center">
                {team}
              </div>
            </div>
          ))}
          <div
            className={
              "bg-blue-500 flex items-center justify-center pt-[10px] pb-[10px]"
            }
          >
            <div className="w-[32px] h-[32px] rounded-[8px] bg-amber-200 flex items-center justify-center">
              플러스버튼
            </div>
          </div>
        </div>
        <div className="bg-amber-400 w-[240px]">
          <div className="h-[80px] bg-pink-300">선택한 팀 이름 더보기</div>
          <div>네비게이션</div>
          <div>프라이빗</div>
          <div>팀스페이스</div>
          <div>췌링~</div>
          <div
            onClick={() => {
              user.logout();
              navigator("/login");
            }}
          >
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
