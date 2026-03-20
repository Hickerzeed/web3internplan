type ReviewSyncPayload = {
  walletAddress: string;
  taskId: string;
  taskTitle: string;
  proof?: string;
  approved: boolean;
  reason?: string;
  reviewerId?: string;
  reviewerName?: string;
};

function getReviewSyncApi() {
  return (
    import.meta.env.VITE_CUBER_REVIEW_SYNC_API ||
    'http://localhost:8080/api/contracts/cuber-achievement/reviews'
  );
}

export async function syncTaskReview(payload: ReviewSyncPayload) {
  const response = await fetch(getReviewSyncApi(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Failed to sync task review.');
  }

  return response.json();
}

