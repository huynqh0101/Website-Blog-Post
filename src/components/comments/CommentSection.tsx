"use client";

import { useState, useEffect } from "react";
import { commentService } from "@/services/commentService";
import { Comment } from "@/types/comment";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [dislikes, setDislikes] = useState<{ [key: string]: number }>({});
  const [userVotes, setUserVotes] = useState<{
    [key: string]: "like" | "dislike" | null;
  }>({});
  const fetchComments = async () => {
    setIsLoadingComments(true);
    try {
      const data = await commentService.getCommentsByArticle(articleId);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    const emoji = emojiObject.emoji;
    setNewComment((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };
  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const result = await commentService.createComment(newComment, articleId);
      if (result) {
        setNewComment("");
        await fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = (commentId: string, voteType: "like" | "dislike") => {
    setUserVotes((prev) => {
      const currentVote = prev[commentId];
      if (currentVote === voteType) {
        // Remove vote if clicking same button
        const newVotes = { ...prev };
        delete newVotes[commentId];
        return newVotes;
      }
      return { ...prev, [commentId]: voteType };
    });

    if (voteType === "like") {
      setLikes((prev) => ({
        ...prev,
        [commentId]: (prev[commentId] || 0) + 1,
      }));
      if (userVotes[commentId] === "dislike") {
        setDislikes((prev) => ({
          ...prev,
          [commentId]: Math.max(0, (prev[commentId] || 0) - 1),
        }));
      }
    } else {
      setDislikes((prev) => ({
        ...prev,
        [commentId]: (prev[commentId] || 0) + 1,
      }));
      if (userVotes[commentId] === "like") {
        setLikes((prev) => ({
          ...prev,
          [commentId]: Math.max(0, (prev[commentId] || 0) - 1),
        }));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm p-2 border relative"
      >
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận của bạn..."
              className="w-full p-3 border rounded-lg min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute bottom-2 right-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FaSmile className="w-5 h-5" />
            </button>
          </div>

          {showEmojiPicker && (
            <div className="absolute bottom-24 right-0 z-10 shadow-lg rounded-lg">
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200 font-medium"
            >
              {isLoading ? "Đang gửi..." : "Gửi bình luận"}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-6">
          Bình luận ({comments.length})
        </h3>
        {isLoadingComments ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg shadow-sm p-6 border hover:shadow-md transition duration-200"
              >
                <div className="flex items-start space-x-4">
                  {comment.user.avatar ? (
                    <img
                      src={`http://localhost:1337/uploads/${comment.user.avatar.formats.thumbnail.url
                        .split("/")
                        .pop()}`}
                      alt={`${comment.user.username}'s avatar`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = "/default-avatar.png";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {comment.user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-gray-900">
                          {comment.user.username}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-2 text-base">
                      {comment.content}
                    </p>
                    <div className="flex items-center space-x-6 mt-4">
                      <button
                        onClick={() => handleVote(String(comment.id), "like")}
                        className={`flex items-center space-x-2 text-sm ${
                          userVotes[comment.id] === "like"
                            ? "text-blue-600"
                            : "text-gray-500"
                        } hover:text-blue-600 transition duration-200`}
                      >
                        <FaThumbsUp className="w-4 h-4" />
                        <span>{likes[comment.id] || 0}</span>
                      </button>
                      <button
                        onClick={() =>
                          handleVote(String(comment.id), "dislike")
                        }
                        className={`flex items-center space-x-2 text-sm ${
                          userVotes[comment.id] === "dislike"
                            ? "text-red-600"
                            : "text-gray-500"
                        } hover:text-red-600 transition duration-200`}
                      >
                        <FaThumbsDown className="w-4 h-4" />
                        <span>{dislikes[comment.id] || 0}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition duration-200">
                        <FaReply className="w-4 h-4" />
                        <span>Trả lời</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">Chưa có bình luận nào.</p>
          </div>
        )}
      </div>
    </div>
  );
}
