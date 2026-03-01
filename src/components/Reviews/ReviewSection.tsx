"use client";

import { useState } from "react";
import { toast } from "sonner";
;
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { ReviewServices } from "@/services/reviews.services";

type Review = {
  id: string;
  rating: number;
  commnet: string;
  createdAt: string;
  Customer: { name: string; image?: string };
};

export default function ReviewSection({
  medicineId,
  reviews: initialReviews,
}: {
  medicineId: string;
  reviews: Review[];
}) {
  const { data: session } = authClient.useSession();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async () => {
    if (rating === 0) { toast.error("Please select a rating"); return; }
    if (!comment.trim()) { toast.error("Please write a comment"); return; }

    setLoading(true);
    const toastId = toast.loading("Submitting review...");

    const { data, error } = await ReviewServices.CreateReviews({
      rating,
      commnet: comment,     
      medicine_id: medicineId,
    });

    setLoading(false);

    if (error) { toast.error(error.message, { id: toastId }); return; }

    toast.success("Review submitted!", { id: toastId });

    // * page reload ছাড়াই নতুন review list এ যোগ হবে
    setReviews((prev) => [
      { ...data.data, Customer: { name: session?.user?.name || "You" } },
      ...prev,
    ]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="space-y-6 mt-10">
      <h2 className="text-2xl font-bold">Reviews ({reviews.length})</h2>

   
      {session?.user ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Star Rating */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-7 h-7 cursor-pointer transition-colors ${
                    star <= (hoveredStar || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                />
              ))}
            </div>

            <Textarea
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none"
            />

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Review"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <p className="text-sm text-muted-foreground">
          Please login to write a review.
        </p>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
                      {review.Customer?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{review.Customer?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Star Display */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">{review.commnet}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}