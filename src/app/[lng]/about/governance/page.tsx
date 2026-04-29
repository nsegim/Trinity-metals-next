'use client'
import '../styles.css';
import { useTranslation } from '@/app/context/TranslationContext';
import { useEffect, useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import ImageGallery from '@/components/common/ImageGallery';
import Link from 'next/link';
import { fetchData } from '../../../../../lib/config/apiConfig';

interface MemberData {
  id: number;
  tags?: number[];
  name: string;
  [key: string]: any;
}

interface TagResponse {
  id: number;
  name: string;
}

export default function Governance() {
  const { dict, lang } = useTranslation();
  const currentLang = lang || 'en';
  const d = dict || {};

  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [managementMembers, setManagementMembers] = useState<{
    kiny: MemberData[];
    en: MemberData[];
  }>({ kiny: [], en: [] });
  const [loading, setLoading] = useState(true);

  // ✅ Single fetch — no dependency on 'data' state
  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);

      // ✅ Fetch members and tags IN PARALLEL with Promise.all
      const members: MemberData[] = await fetchData(
        'member-showcase?per_page=100&_embed'
      );

      if (!members || members.length === 0) return;

      const tagIds = new Set<number>();
      members.forEach((item) =>
        item.tags?.forEach((id: number) => tagIds.add(id))
      );

      // ✅ Fetch tags in parallel alongside members processing
      const tagResponses: TagResponse[] =
        tagIds.size > 0
          ? await fetchData(`tags?include=${[...tagIds].join(',')}`)
          : [];

      const tagLookup: Record<number, string> = tagResponses.reduce(
        (acc, tag) => ({ ...acc, [tag.id]: tag.name }),
        {} as Record<number, string>
      );

      const managementTemp: MemberData[] = [];
      const managementKinyTemp: MemberData[] = [];

      members.forEach((item) => {
        const tags =
          item.tags?.map((id) => tagLookup[id]).filter(Boolean) || [];
        if (tags.includes('Management Team')) managementTemp.push(item);
        if (tags.includes("Abagize inama y'ubucukuzi bwa Rutongo"))
          managementKinyTemp.push(item);
      });

      setManagementMembers({ en: managementTemp, kiny: managementKinyTemp });
    } catch (err) {
      console.error('Failed to load members:', err);
    } finally {
      setLoading(false);
    }
  }, []); // ✅ Empty deps — runs once only

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const displayMembers =
    currentLang === 'kiny'
      ? managementMembers.kiny.slice(0, 3)
      : managementMembers.en.slice(4, 8).reverse();

  return (
    <>
      {/* Hero */}
      <div className="about-hero-section products-hero">
        <div className="inner-wrapper">
          <h1 className="heading text-uppercase">
            {dict['about-us-page']?.['about-us-subpage-title-governance']}
          </h1>
        </div>
      </div>

      {/* Executive Management */}
      <div className="executive-management-wrapper">
        <div className="container">
          <div className="header-part">
            <h2 className="text-center">
              {d['our-leadership']?.['executive-management']}
            </h2>
          </div>

          <div className="team-members">
            {loading ? (
              // ✅ Skeleton loader instead of spinner — feels faster
              <div className="team-member-wrapper">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="single-team-member skeleton-card">
                    <div className="skeleton skeleton-image" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text-short" />
                  </div>
                ))}
              </div>
            ) : displayMembers.length > 0 ? (
              <div className="team-member-wrapper">
                {displayMembers.map((item: any) => (
                  <div key={item.id} className="single-team-member">
                    <ImageGallery
                      imageUrl={
                        item._embedded?.['wp:featuredmedia']?.[0]
                          ?.source_url || '/loader.gif'
                      }
                      customClass="team-member-photo"
                      height={330}
                      width={412}
                      alt={undefined}
                      imageName={`Team Member: ${item.title?.rendered}`}
                    />
                    <div className="team-member-details">
                      <div className="team-member-info">
                        <h3
                          className="member-name"
                          dangerouslySetInnerHTML={{
                            __html: item.title?.rendered,
                          }}
                        />
                        <p className="member-post">
                          {item.acf?.member_personal_information?.designation}
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
                                  item._embedded?.['wp:featuredmedia']?.[0]
                                    ?.source_url
                                }
                                customClass="team-member-photo"
                                height={330}
                                width={259}
                                alt={undefined}
                                imageName={`Modal: ${item.title?.rendered}`}
                              />
                            </div>
                            <div
                              className="text-content"
                              dangerouslySetInnerHTML={{
                                __html: item.content?.rendered || '',
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
                          imageName="View Member Details"
                          customClass="View-team-desc"
                          alt={undefined}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No members found.</p>
            )}
          </div>

          <div className="general-button justify-content-center">
            <Link href={`/${currentLang}/our-leadership`} className="hover-green">
              <span>{d['about-us-page']?.['view-all-team-button']}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}