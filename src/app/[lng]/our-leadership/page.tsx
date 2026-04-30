'use client'
import Link from "next/link"
import ImageGallery from "@/components/common/ImageGallery";
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState, useCallback } from 'react';
import './styles.css'
import { fetchData } from "../../../../lib/config/apiConfig";
import { useTranslation } from "../../context/TranslationContext";
import SkeletonCard from "@/components/ui/SkeletonCard";

interface TeamMember {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: { member_personal_information: { designation: string } };
  _embedded?: { 'wp:featuredmedia'?: [{ source_url: string }] };
  tags?: number[];
}

interface Tag {
  id: number;
  name: string;
}

interface MembersByLanguage {
  kiny: TeamMember[];
  en: TeamMember[];
}



export default function Page() {
  const { dict, lang } = useTranslation();
  const currentLang = lang || 'en';

  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [boardMembers, setBoardMembers] = useState<MembersByLanguage>({
    kiny: [],
    en: [],
  });

  const [managementMembers, setManagementMembers] = useState<MembersByLanguage>({
    kiny: [],
    en: [],
  });

  const [rutongoBoardMembers, setRutongoBoardMembers] = useState<TeamMember[]>([]);

  // ✅ Single fetch — runs once, processes everything together
  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);

      const members: TeamMember[] = await fetchData(
        'member-showcase?per_page=100&_embed'
      );

      if (!members || members.length === 0) return;

      // Collect unique tag IDs
      const tagIds = new Set<number>();
      members.forEach((item) =>
        item.tags?.forEach((id) => tagIds.add(id))
      );

      // ✅ Fetch tags only if needed
      const tagLookup: Record<number, string> = {};
      if (tagIds.size > 0) {
        const tagResponses: Tag[] = await fetchData(
          `tags?include=${[...tagIds].join(',')}`
        );
        tagResponses.forEach((tag) => {
          tagLookup[tag.id] = tag.name;
        });
      }

      // ✅ Process all categories in one pass
      const boardEn: TeamMember[] = [];
      const boardKiny: TeamMember[] = [];
      const managementEn: TeamMember[] = [];
      const managementKiny: TeamMember[] = [];
      const rutongoBoard: TeamMember[] = [];

      members.forEach((item) => {
        const tagNames =
          item.tags?.map((id) => tagLookup[id]).filter(Boolean) || [];

        if (tagNames.includes('Board member')) boardEn.push(item);
        if (tagNames.includes("Inama y'Ubutegetsi")) boardKiny.push(item);
        if (tagNames.includes('Management Team')) managementEn.push(item);
        if (tagNames.includes("Abagize inama y'ubucukuzi bwa Rutongo"))
          managementKiny.push(item);
        if (tagNames.includes('Rutongo Mines Board Members'))
          rutongoBoard.push(item);
      });

      // ✅ All state updates at once — single re-render
      setBoardMembers({ en: boardEn, kiny: boardKiny });
      setManagementMembers({ en: managementEn, kiny: managementKiny });
      setRutongoBoardMembers(rutongoBoard);
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  // ✅ Derived display lists — no extra state needed
  const displayBoard =
    currentLang === 'kiny'
      ? boardMembers.kiny
      : [...boardMembers.en].reverse();

  const displayManagement =
    currentLang === 'kiny'
      ? managementMembers.kiny
      : [...managementMembers.en].reverse();

  // ✅ Reusable member card
  const MemberCard = ({ item }: { item: TeamMember }) => (
    <div key={item.id} className="single-team-member">
      <ImageGallery
        imageUrl={
          item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          '/loader.gif'
        }
        customClass="team-member-photo"
        height={330}
        width={412}
        imageName={`Member: ${item.title.rendered}`}
        alt={undefined}
      />
      <div className="team-member-details">
        <div className="team-member-info">
          <h2
            className="member-name"
            dangerouslySetInnerHTML={{ __html: item.title.rendered }}
          />
          <p className="member-post">
            {item.acf.member_personal_information.designation}
          </p>
        </div>

        <Modal
          size="lg"
          centered
          show={activeModal === item.id}
          onHide={() => setActiveModal(null)}
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <div className="a-member-desc">
              <div className="a-member-image">
                <ImageGallery
                  imageUrl={
                    item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                    '/loader.gif'
                  }
                  customClass="team-member-photo"
                  height={330}
                  width={259}
                  alt={undefined}
                  imageName={`Modal: ${item.title.rendered}`}
                />
              </div>
              <div
                className="text-content"
                dangerouslySetInnerHTML={{
                  __html: item.content.rendered || '',
                }}
              />
            </div>
          </Modal.Body>
        </Modal>

        <div
          className="view-member-desc"
          onClick={() => setActiveModal(item.id)}
        >
          <ImageGallery
            imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1.svg"
            height={31}
            width={31}
            customClass="icon-vector"
            imageName="View Details"
            alt={undefined}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <div className="about-hero-section leadership-hero">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">
            {dict?.['our-leadership']?.['our-leadership-title']}
          </h1>
        </div>
      </div>

      <div className="Team-container-wrapper">
        <div className="container d-flex flex-column">

          {/* Board Members */}
          <div className="header-element pt-5">
            <h2 className="text-center">
              {dict?.['our-leadership']?.['board-members']}
            </h2>
          </div>

          <div className="team-members first-grid pb-2">
            {loading ? (
              <div className="team-member-wrapper">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : displayBoard.length > 0 ? (
              <div className="team-member-wrapper">
                {displayBoard.map((item) => (
                  <MemberCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center">No board members found.</p>
            )}
          </div>

          {/* Executive Management */}
          <div className="header-element">
            <h2 className="text-center">
              {dict?.['our-leadership']?.['executive-management']}
            </h2>
          </div>

          <div className="team-members second-grid">
            {loading ? (
              <div className="team-member-wrapper">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : displayManagement.length > 0 ? (
              <div className="team-member-wrapper">
                {displayManagement.map((item) => (
                  <MemberCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-center">No management members found.</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}