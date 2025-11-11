// app/leadership/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ImageGallery from '@/components/common/ImageGallery';
import Spinner from '@/components/ui/Spinner/Spinner';
import Modal from 'react-bootstrap/Modal';
import { fetchData } from '../../../../lib/config/apiConfig';
import { useTranslation } from '../../context/TranslationContext';
import './styles.css';

interface TeamMember {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf: { member_personal_information: { designation: string } };
  _embedded?: { 'wp:featuredmedia'?: [{ source_url: string }] };
  tags?: number[];
}

// Properly typed state with correct initial value
interface MembersByLang {
  en: TeamMember[];
  kiny: TeamMember[];
}

interface MembersState {
  board: MembersByLang;
  management: MembersByLang;
  rutongo: MembersByLang;
}

export default function Leadership() {
  const { dict, lang } = useTranslation();

  const [data, setData] = useState<TeamMember[]>([]);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  // FIX: Add proper type + correct initial state
  const [members, setMembers] = useState<MembersState>({
    board: { en: [], kiny: [] },
    management: { en: [], kiny: [] },
    rutongo: { en: [], kiny: [] }
  });

  // Fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetchData('member-showcase?per_page=100&_embed');
        setData(response || []);
      } catch (err) {
        console.error("Failed to fetch team members:", err);
      }
    };
    fetchMembers();
  }, []);

  // Process members by language
  useEffect(() => {
    if (data.length === 0) return;

    const boardEn: TeamMember[] = [];
    const boardKiny: TeamMember[] = [];
    const managementEn: TeamMember[] = [];
    const managementKiny: TeamMember[] = [];
    const rutongoEn: TeamMember[] = [];
    const rutongoKiny: TeamMember[] = [];

    data.forEach((item) => {
      const tags = item.tags || [];

      // English
      if (tags.includes(16)) boardEn.push(item);        // Board member
      if (tags.includes(17)) managementEn.push(item);   // Management Team
      if (tags.includes(18)) rutongoEn.push(item);      // Rutongo Board

      // Kinyarwanda
      if (tags.includes(19)) boardKiny.push(item);      // Inama y'Ubutegetsi
      if (tags.includes(20)) managementKiny.push(item); // Abagize inama...
    });

    setMembers({
      board: { en: boardEn.reverse(), kiny: boardKiny },
      management: { en: managementEn.reverse(), kiny: managementKiny },
      rutongo: { en: rutongoEn.reverse(), kiny: rutongoKiny }
    });
  }, [data]);

  // Helper to get members based on current language
  const getMembers = (type: 'board' | 'management' | 'rutongo'): TeamMember[] => {
    const currentLangKey = lang === 'kiny' ? 'kiny' : 'en';
    return members[type][currentLangKey];
  };

  return (
    <>
      {/* Hero */}
      <div className="about-hero-section">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">
            {dict["our-leadership"]?.["our-leadership-title"] || "Our Leadership"}
          </h1>
        </div>
      </div>

      <div className="Team-container-wrapper">
        <div className="container d-flex flex-column">

          {/* Board Members */}
          <div className="header-element pt-5">
            <h2 className="text-center">
              {dict["our-leadership"]?.["board-members"] || "Board of Directors"}
            </h2>
          </div>

          <div className="team-members first-grid pb-5">
            {getMembers('board').length > 0 ? (
              <div className="team-member-wrapper">
                {getMembers('board').map((item) => (
                  <div key={item.id} className="single-team-member">
                    <ImageGallery
                      imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg"}
                      customClass="team-member-photo"
                      width={412}
                      height={330}
                      imageName="Member image"
                    />
                    <div className="team-member-details">
                      <div className="team-member-info">
                        <h2
                          className="member-name"
                          dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                        />
                        <p className="member-post">
                          {item.acf?.member_personal_information?.designation || ""}
                        </p>
                      </div>
                      <div
                        className="view-member-desc"
                        onClick={() => setActiveModal(item.id)}
                      >
                        <ImageGallery
                          imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1.svg"
                          width={31}
                          height={31}
                          customClass="view-more-icon"
                          imageName="view description"
                        />
                      </div>
                    </div>

                    {/* Modal */}
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
                              imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg"}
                              customClass="team-member-photo"
                              width={259}
                              height={330}
                              imageName="Member image"
                            />
                          </div>
                          <div className="text-content">
                            <h3 dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.content.rendered || "No biography available."
                              }}
                            />
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>

          {/* Executive Management */}
          <div className="header-element pt-5">
            <h2 className="text-center">
              {dict["our-leadership"]?.["executive-management"] || "Executive Management Team"}
            </h2>
          </div>

          <div className="team-members second-grid pb-5">
            {getMembers('management').length > 0 ? (
              <div className="team-member-wrapper">
                {getMembers('management').map((item) => (
                  <div key={item.id} className="single-team-member">
                    <ImageGallery
                      imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg"}
                      customClass="team-member-photo"
                      width={412}
                      height={330}
                      imageName="Member image"
                    />
                    <div className="team-member-details">
                      <div className="team-member-info">
                        <h2
                          className="member-name"
                          dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                        />
                        <p className="member-post">
                          {item.acf?.member_personal_information?.designation || ""}
                        </p>
                      </div>
                      <div
                        className="view-member-desc"
                        onClick={() => setActiveModal(item.id)}
                      >
                        <ImageGallery
                          imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1.svg"
                          width={31}
                          height={31}
                          customClass="view-more-icon"
                          imageName="view description"
                        />
                      </div>
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
                              imageUrl={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/placeholder.jpg"}
                              customClass="team-member-photo"
                              width={259}
                              height={330}
                              imageName="Member image"
                            />
                          </div>
                          <div className="text-content">
                            <h3 dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.content.rendered || "No biography available."
                              }}
                            />
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>

        </div>
      </div>
    </>
  );
}