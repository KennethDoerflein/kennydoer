// src/app/page.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import appInfo from "../../package.json";
import Footer from "./components/Footer";
import ImageModal from "./components/ImageModal";
import ProjectCard from "./components/ProjectCard";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { projects as projectsData } from "./data/projects";
import type { Project } from "./types";
import { getProjectCardVariants } from "./utils/projectCardAnimations";
type ProjectData = Omit<Project, "onImageClick" | "isFirst">;

// Scalable complexity levels map
const complexityLevels = {
  Beginner: 1,
  Advanced_Beginner: 1.5,
  Intermediate: 2,
  Advanced: 3,
  Proficient: 4,
} as const;

type ComplexityLabel = keyof typeof complexityLevels;

// Type guards for optional properties
function hasYear(p: Partial<ProjectData>): p is ProjectData & { year: number } {
  return typeof p.year === "number";
}
function hasComplexity(
  p: Partial<ProjectData>
): p is ProjectData & { complexity: ComplexityLabel } {
  return typeof p.complexity === "string" && p.complexity in complexityLevels;
}
function hasCompletionTime(p: Partial<ProjectData>): p is ProjectData & { completionTime: string } {
  return typeof p.completionTime === "string" && p.completionTime.length > 0;
}

function compareComplexity(a: Partial<ProjectData>, b: Partial<ProjectData>, asc = true) {
  const idxA = hasComplexity(a) ? complexityLevels[a.complexity] : -1;
  const idxB = hasComplexity(b) ? complexityLevels[b.complexity] : -1;
  if (idxA === -1 && idxB === -1) return 0;
  if (idxA === -1) return 1;
  if (idxB === -1) return -1;
  return asc ? idxA - idxB : idxB - idxA;
}

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "year-asc", label: "Year: Oldest to Newest" },
  { value: "year-desc", label: "Year: Newest to Oldest" },
  { value: "complexity-asc", label: "Complexity: Least to Most" },
  { value: "complexity-desc", label: "Complexity: Most to Least" },
  { value: "completion-asc", label: "Completion Time: Least to Most" },
  { value: "completion-desc", label: "Completion Time: Most to Least" },
];

function parseCompletionTime(time?: string): number | null {
  if (!time) return null;
  const match = time.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : null;
}

const sortFunctions: Record<string, (a: ProjectData, b: ProjectData) => number> = {
  "year-asc": (a, b) => {
    if (!hasYear(a) && !hasYear(b)) return 0;
    if (!hasYear(a)) return 1;
    if (!hasYear(b)) return -1;
    return a.year - b.year;
  },
  "year-desc": (a, b) => {
    if (!hasYear(a) && !hasYear(b)) return 0;
    if (!hasYear(a)) return 1;
    if (!hasYear(b)) return -1;
    return b.year - a.year;
  },
  "complexity-asc": (a, b) => compareComplexity(a, b, true),
  "complexity-desc": (a, b) => compareComplexity(a, b, false),
  "completion-asc": (a, b) => {
    const tA = hasCompletionTime(a) ? parseCompletionTime(a.completionTime) : null;
    const tB = hasCompletionTime(b) ? parseCompletionTime(b.completionTime) : null;
    if (tA === null && tB === null) return 0;
    if (tA === null) return 1;
    if (tB === null) return -1;
    return tA - tB;
  },
  "completion-desc": (a, b) => {
    const tA = hasCompletionTime(a) ? parseCompletionTime(a.completionTime) : null;
    const tB = hasCompletionTime(b) ? parseCompletionTime(b.completionTime) : null;
    if (tA === null && tB === null) return 0;
    if (tA === null) return 1;
    if (tB === null) return -1;
    return tB - tA;
  },
};

const HomePage: NextPage = () => {
  const [show, setShow] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [sort, setSort] = useState("default");

  const openModal = (src: string) => {
    if (window.innerWidth > 768) {
      setModalSrc(src);
      setShow(true);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const isDevVersion = /beta|alpha|rc/i.test(appInfo.version);

  // Determine which sort options to show based on available attributes
  const hasYear = projectsData.some((p) => "year" in p && typeof p.year === "number");
  const hasComplexity = projectsData.some(
    (p) => "complexity" in p && typeof p.complexity === "string" && p.complexity.length > 0
  );
  const hasCompletion = projectsData.some(
    (p) =>
      "completionTime" in p && typeof p.completionTime === "string" && p.completionTime.length > 0
  );

  const filteredSortOptions = useMemo(() => {
    return sortOptions.filter((opt) => {
      if (opt.value === "default") return true;
      if (opt.value.startsWith("year") && !hasYear) return false;
      if (opt.value.startsWith("complexity") && !hasComplexity) return false;
      if (opt.value.startsWith("completion") && !hasCompletion) return false;
      return true;
    });
  }, [hasYear, hasComplexity, hasCompletion]);

  // Ensure all projects have intrinsicWidth and intrinsicHeight for sorting
  const normalizedProjects = useMemo(() => {
    return projectsData.map((p) => ({
      ...p,
      intrinsicWidth: p.intrinsicWidth ?? 1,
      intrinsicHeight: p.intrinsicHeight ?? 1,
    })) as ProjectData[];
  }, []);

  const sortedProjects = useMemo(() => {
    const projectsToSort = [...normalizedProjects];

    if (sort === "default") {
      return projectsToSort;
    }
    if (sort in sortFunctions) {
      return projectsToSort.sort(sortFunctions[sort]);
    }

    return projectsToSort;
  }, [sort, normalizedProjects]);

  return (
    <>
      {isDevVersion && (
        <Alert variant="danger" className="text-center mx-auto compact-alert px-3 mb-2 m-1">
          <strong>Development Version: </strong>
          You are currently on the development site. Features may be outdated or unstable.
          <div className="mt-2">
            <a
              href="https://kennydoer.com"
              rel="noopener noreferrer"
              className="btn btn-dark btn-sm">
              Go to Main Site
            </a>
          </div>
        </Alert>
      )}

      <Alert variant="warning" className="text-center mx-auto compact-alert px-3 mb-0">
        <strong>Note: </strong>⚠️ All databases automatically reset to a known state every 30
        minutes (e.g., 10:00, 10:30, 11:00...).
      </Alert>

      <Container>
        <div className="d-flex justify-content-center align-items-center mt-4 pt-1">
          <label htmlFor="sort-select" className="fw-bold me-2 ">
            Sort Projects:
          </label>
          <select
            id="sort-select"
            className="form-select form-select-sm w-auto"
            style={{
              minWidth: 160,
              fontWeight: 500,
              boxShadow: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
            value={sort}
            onChange={handleSortChange}>
            {filteredSortOptions.map(({ value, label }) => (
              <option key={value} value={value} style={{ background: "#181b20", color: "#fff" }}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <Row as={motion.div} key={sort} xs={1}>
            {sortedProjects.map((p, index) => (
              <Col
                as={motion.div}
                key={p.title}
                {...getProjectCardVariants(sortedProjects.length, index)}>
                <ProjectCard {...p} onImageClick={openModal} isFirst={index === 0} />
              </Col>
            ))}
          </Row>
        </AnimatePresence>

        <ScrollToTopButton />
      </Container>

      <ImageModal show={show} onHide={() => setShow(false)} src={modalSrc} />

      <Footer appInfo={appInfo} />
    </>
  );
};

export default HomePage;
