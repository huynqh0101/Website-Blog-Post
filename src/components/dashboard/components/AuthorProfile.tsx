import Image from "next/image";
import { Article } from "@/types/articleAdmin";

interface AuthorProfileProps {
  articles: Article[];
}

export const AuthorProfile = ({ articles }: AuthorProfileProps) => {
  if (articles.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-medium mb-4">Author Profile</h2>
      <div>
        <div className="flex items-center mb-3">
          {(() => {
            // Lấy thông tin author từ localStorage
            const currentAuthorString = localStorage.getItem("currentAuthor");
            let avatarUrl = "";

            if (currentAuthorString) {
              try {
                const currentAuthor = JSON.parse(currentAuthorString);
                // Sử dụng avatar từ localStorage nếu có
                if (currentAuthor.avatar) {
                  avatarUrl = currentAuthor.avatar;
                }
              } catch (e) {
                console.error(
                  "Error parsing currentAuthor from localStorage:",
                  e
                );
              }
            }

            return avatarUrl ? (
              <div className="w-12 h-12 relative rounded-full overflow-hidden mr-3">
                <Image
                  src={avatarUrl}
                  alt={articles[0].author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              // Fallback về chữ cái đầu khi không có avatar
              <div className="w-12 h-12 bg-[#3a5b22] rounded-full flex items-center justify-center text-white font-medium mr-3">
                {articles[0].author.name.charAt(0)}
              </div>
            );
          })()}
          <div>
            <p className="font-medium">{articles[0].author.name}</p>
            <p className="text-sm text-gray-500">{articles[0].author.email}</p>
          </div>
        </div>
        {articles[0].author.bio && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {articles[0].author.bio}
          </p>
        )}
      </div>
    </div>
  );
};
