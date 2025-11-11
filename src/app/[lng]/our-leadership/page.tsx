'use client'
import Link from "next/link"
import ImageGallery from "@/components/common/ImageGallery";
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import './styles.css'
import { fetchData } from "../../../../lib/config/apiConfig";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useTranslation } from "../../context/TranslationContext";

// ✅ Fixed interface
interface TeamMember {
  id: number;
  title: { rendered: string }; // ✅ Changed from 'render' to 'rendered'
  content: { rendered: string };
  acf: { member_personal_information: { designation: string } };
  _embedded?: { 'wp:featuredmedia'?: [{ source_url: string }] };
  tags?: number[];
}

// ✅ Added Tag interface
interface Tag {
  id: number;
  name: string;
}

// ✅ Added TagLookup interface
interface TagLookup {
  [key: number]: string;
}

// ✅ Added MembersByLanguage interface
interface MembersByLanguage {
  kiny: TeamMember[];
  en: TeamMember[];
}

export default function Page() {
  const { dict, lang } = useTranslation();
  
  // ✅ Properly typed state variables
  const [modalShow1, setModalShow1] = useState<boolean>(false);
  const [modalShow001, setModalShow001] = useState<boolean>(false);
  const [data, setData] = useState<TeamMember[]>([]);
  const [tags, setTags] = useState<{ [key: number]: string[] }>({});
  const [error, setError] = useState<Error | null>(null);
  const [boardMember, setBoardMember] = useState<TeamMember[]>([]);
  const [managementMember, setManagementMember] = useState<TeamMember[]>([]);
  const [boardMemberKiny, setBoardMemberKiny] = useState<TeamMember[]>([]);
  const [managementMemberKiny, setManagementMemberKiny] = useState<TeamMember[]>([]);
  const [rutongoBoardMember, setRutongoBoardMember] = useState<TeamMember[]>([]);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  
  const [bordMembers, setBoardMembers] = useState<MembersByLanguage>({
    kiny: [],
    en: []
  });
  
  const [managementMembers, setManagementMembers] = useState<MembersByLanguage>({
    kiny: [],
    en: []
  });

  const currentLang = lang; // ✅ Fixed: use lang from useTranslation

  // Fetch posts
  const getMembers = async () => {
    try {
      const response = await fetchData('member-showcase?per_page=100&_embed');
      setData(response);
    } catch (error) {
      setError(error as Error);
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    const processMembers = async () => {
      if (data.length === 0) return;

      // ✅ Properly typed arrays
      const boardTemp: TeamMember[] = [];
      const rutongoBoardTemp: TeamMember[] = [];
      const managementTemp: TeamMember[] = [];
      const boardTempKiny: TeamMember[] = [];
      const managementTempKiny: TeamMember[] = [];
      const tagsMap: { [key: number]: string[] } = {};

      // Collect unique tag IDs for batch fetching
      const tagIds = new Set<number>();

      // Collect all tag IDs (handling multiple tags per member)
      data.forEach((item) => {
        if (item?.tags?.length && item.tags.length > 0) {
          item.tags.forEach((tagId) => tagIds.add(tagId));
        }
      });

      // Only fetch tags if there are any
      if (tagIds.size > 0) {
        // Fetch all tags in one API request
        const tagResponses: Tag[] = await fetchData(`tags?include=${[...tagIds].join(",")}`);
        const tagLookup: TagLookup = {}; // Map tag ID to tag name
        
        tagResponses.forEach(tag => {
          tagLookup[tag.id] = tag.name;
        });

        // Process members with tags
        data.forEach((item) => {
          const tagNames = item?.tags?.map(tagId => tagLookup[tagId]) || [];
          tagsMap[item.id] = tagNames; // Store all assigned tags

          // Categorize team members if at least one tag matches
          if (tagNames.includes("Board member")) boardTemp.push(item);
          if (tagNames.includes("Management Team")) managementTemp.push(item);
          if (tagNames.includes("Rutongo Mines Board Members")) rutongoBoardTemp.push(item);
          if (tagNames.includes("Inama y'Ubutegetsi")) boardTempKiny.push(item);
          if (tagNames.includes("Abagize inama y'ubucukuzi bwa Rutongo")) managementTempKiny.push(item);
        });

        // Update state once (avoids multiple re-renders)
        setTags(tagsMap);
        setBoardMember(boardTemp);
        setBoardMembers({
          en: boardTemp,
          kiny: boardTempKiny
        });
        setManagementMember(managementTemp);
        setManagementMembers({
          en: managementTemp,
          kiny: managementTempKiny
        });
        setRutongoBoardMember(rutongoBoardTemp);
      }
    };

    processMembers();
  }, [data]);

  return (
    <>
      {/* Hero section */}
      <div className="about-hero-section">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">
            {dict?.['our-leadership']?.['our-leadership-title']}
          </h1>
        </div>
      </div>

      {/* Team members section */}
      <div className="Team-container-wrapper">
        <div className="container d-flex flex-column">
          {/* Board Members Section */}
          <div className="header-element pt-5">
            <h2 className="text-center">
              {dict?.['our-leadership']?.['board-members']}
            </h2>
          </div>

          <div className="team-members first-grid pb-2">
            {bordMembers?.[currentLang === "kiny" ? "kiny" : "en"]?.length > 0 ? (
              <div className="team-member-wrapper">
                {(currentLang === "kiny"
                  ? bordMembers.kiny.slice()
                  : bordMembers.en.slice().reverse()
                ).map((item) => (
                  <div key={item.id} className="single-team-member">
                    <ImageGallery
                      imageUrl={
                        item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                        "https://contents.trinity-metals.com/wp-content/uploads/2025/02/animated_loader_gif_n6b5x0.gif"
                      }
                      customClass={'team-member-photo'}
                      height={330}
                      width={412}
                      imageName={`Board Member: ${item.title.rendered}`}
                    />
                    <div className="team-member-details">
                      <div className="team-member-info">
                        <h2 className="member-name">{item.title.rendered}</h2>
                        <p className="member-post">
                          {item.acf.member_personal_information.designation}
                        </p>
                      </div>

                      <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
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
                                  "https://contents.trinity-metals.com/wp-content/uploads/2025/02/animated_loader_gif_n6b5x0.gif"
                                }
                                customClass={'team-member-photo'}
                                height={330}
                                width={259}
                                imageName={`Modal: ${item.title.rendered}`}
                              />
                            </div>
                            <div className="text-content">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.content.rendered || "Content is loading..."
                                }}
                              />
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>

                      <div className="view-member-desc" onClick={() => setActiveModal(item.id)}>
                        <ImageGallery
                          imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1.svg"
                          height={31}
                          width={31}
                          customClass="icon-vector"
                          imageName="View Details"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </div>

          {/* Executive Management Section */}
          <div className="header-element">
            <h2 className="text-center">
              {dict?.['our-leadership']?.['executive-management']}
            </h2>
          </div>

          <div className="team-members second-grid">
            {managementMembers?.[currentLang === "kiny" ? "kiny" : "en"]?.length > 0 ? (
              <div className="team-member-wrapper">
                {(currentLang === "kiny"
                  ? managementMembers.kiny.slice()
                  : managementMembers.en.slice().reverse()
                ).map((item) => (
                  <div key={item.id} className="single-team-member">
                    <ImageGallery
                      imageUrl={
                        item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                        "https://contents.trinity-metals.com/wp-content/uploads/2025/02/animated_loader_gif_n6b5x0.gif"
                      }
                      customClass={'team-member-photo'}
                      height={330}
                      width={412}
                      imageName={`Management: ${item.title.rendered}`}
                    />
                    <div className="team-member-details">
                      <div className="team-member-info">
                        <h2 className="member-name">{item.title.rendered}</h2>
                        <p className="member-post">
                          {item.acf.member_personal_information.designation}
                        </p>
                      </div>

                      <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
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
                                  "https://contents.trinity-metals.com/wp-content/uploads/2025/02/animated_loader_gif_n6b5x0.gif"
                                }
                                customClass={'team-member-photo'}
                                height={330}
                                width={259}
                                imageName={`Modal: ${item.title.rendered}`}
                              />
                            </div>
                            <div className="text-content">
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.content.rendered || "Content is loading..."
                                }}
                              />
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>

                      <div className="view-member-desc" onClick={() => setActiveModal(item.id)}>
                        <ImageGallery
                          imageUrl="https://contents.trinity-metals.com/wp-content/uploads/2025/02/Vector-1.svg"
                          height={31}
                          width={31}
                          customClass="icon-vector"

                          imageName="View Details"
                        />
                      </div>
                    </div>
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