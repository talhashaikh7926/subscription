import React from 'react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation } from 'react-router';
function SkeletonComponent(props) {

	const location = useLocation();
	if (!location.pathname.includes("auth")) {
		return (
			<main>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
				<SkeletonTheme color="#f0f1f2" highlightColor="#f8f9f9">
					<p>
						<Skeleton height={50} count={3} />
					</p>
				</SkeletonTheme>
			</main>
		);
	}
}

export default SkeletonComponent;