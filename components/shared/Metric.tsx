import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyles: string;
  isAuthor?: boolean;
  href?: string;
}

const Metric = ({
  alt,
  imgUrl,
  href,
  textStyles,
  title,
  value,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <div className="flex-center flex-wrap gap-1">
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {typeof value === "number" ? formatNumber(value) : value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </div>
  );

  if (href) {
    return <Link href={href}>{metricContent}</Link>;
  }
  return <>{metricContent}</>;
};

export default Metric;
