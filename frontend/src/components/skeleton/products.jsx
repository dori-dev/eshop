import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsSkeleton = () => {
  return (
    <div className="row">
      {Array(6)
        .fill(null)
        .map(() => (
          <div className="col-xl-3 col-lg-4 col-md-6 mb-5 text-center">
            <div className="card p-3 h-100" style={{ width: "18rem" }}>
              <Skeleton
                className="mb-2 rounded-3"
                style={{ maxWidth: "100%" }}
                height={"30vh"}
                width={"30vh"}
              />
              <div className="card-body text-start">
                <div className="mb-2">
                  <Skeleton className="mb-2" height={25} />
                  <Skeleton className="mb-2" height={25} width={"70%"} />
                </div>
                <div className="text-muted">
                  <Skeleton className="mb-2" height={15} />
                </div>
                <h4 className="card-text fw-bold mt-4">
                  <Skeleton className="mb-2" height={20} width={"40%"} />
                </h4>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductsSkeleton;
