import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../../components/seo";
import Layout from "../../layouts/Layout";

import Checkbox from "../../components/checkbox/Checkbox";
import {
  setJoinInfo,
  setAgreeRequiredTerms,
} from "../../store/slices/join-slice";

const TermsAndConditions = () => {
  const { t } = useTranslation();

  useEffect(() => {}, []);
  let navigate = useNavigate();

  const prevStage = () => {
    navigate("/login");
  };
  const nextStage = () => {
    dispatch(setAgreeRequiredTerms(true));
    navigate("/signup");
  };
  const dispatch = useDispatch();
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);
  const [agreeClause, setAgreeClause] = useState(false);
  const [agreeCollect, setAgreeCollect] = useState(false);

  const { joinInfo } = useSelector((state) => state.join);

  return (
    <Fragment>
      <SEO titleTemplate="Interior" description="Interior of howterior." />
      <Layout headerTop="visible">
        <div className="shop-area pt-80 pb-90 bg-white">
          <div className=" text-center">
            <div className="font-32 fw-bold text-black_1">
              {t("join membership")}
            </div>
          </div>
          <div className="row-text mt-15 font-18 lh-32 align-items-center  justify-content-center">
            <div className="mr-15 fw-500 text-black_1">
              {t("Acceptance of Terms and Conditions and Self-Authentication")}
            </div>
            <img
              className="icon_10_21"
              src={process.env.PUBLIC_URL + "/assets/img/join/right.png"}
            />
            <div className="ml-15 mr-15 text-gray">
              {t("Enter information")}
            </div>
            <img
              className="icon_10_21"
              src={process.env.PUBLIC_URL + "/assets/img/join/right.png"}
            />
            <div className="ml-15 text-gray">{t("Subscription completed")}</div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-xl-8 col-sm-10 mt-60 pr-10 pl-10">
              <div className="font-18 fw-normal text-black_1">
                {t("Agree to terms and conditions")}
              </div>
              <div className="line bg-black-line mt-15"></div>
              <div className="row-text align-items-center mt-15">
                <Checkbox
                  className="mr-10"
                  size="lg"
                  round={true}
                  grayBorder
                  checked={agreeAll}
                  onChange={() => {
                    if (!agreeAll) {
                      setAgreeClause(true);
                      setAgreeCollect(true);
                      setAgreeAge(true);
                      dispatch(
                        setJoinInfo({
                          ...joinInfo,
                          agree_use: true,
                          agree_marketing: true,
                          agree_location: true,
                        })
                      );
                    } else {
                      setAgreeClause(false);
                      setAgreeCollect(false);
                      setAgreeAge(false);
                      dispatch(
                        setJoinInfo({
                          ...joinInfo,
                          agree_use: false,
                          agree_marketing: false,
                          agree_location: false,
                        })
                      );
                    }
                    setAgreeAll(!agreeAll);
                  }}
                />
                <div className="font-16 fw-bold lh-25">
                  {t("I accept all the terms and conditions of the Hautaire.")}
                </div>
              </div>
              <div className="font-14 mt-5 text-gray_2 pl-30">
                {t(
                  "Terms and conditions subject to consent: Terms and conditions (mandatory), personal information collection and use (mandatory), personal information handling consignment (optional), marketing information utilization (optional), location-based collection consent (optional)"
                )}
              </div>
              <div className="row-text align-items-center mt-30">
                <Checkbox
                  className="mr-10"
                  size="lg"
                  round={true}
                  grayBorder
                  checked={agreeAge}
                  onChange={() => {
                    setAgreeAge(!agreeAge);
                  }}
                />
                <div className="font-14 lh-25">
                  {t("He is over 14 years old. (Required)")}
                </div>
              </div>
              <div className="row-text align-items-center mt-15">
                <Checkbox
                  className="mr-10"
                  size="lg"
                  round={true}
                  grayBorder
                  checked={agreeClause}
                  onChange={() => {
                    setAgreeClause(!agreeClause);
                  }}
                />
                <div className="font-14 lh-25">
                  {t("Acceptance of Terms and Conditions (Required)")}
                </div>
              </div>
              <div className="font-14 mt-5 text-gray_2 pl-30 pt-15 pb-15 pr-50 bg-gray-1  br-10 h-400 scroll_y">
                {`제 1 장 총칙`}
                <br />
                {`제 1 조 (목적)`}
                <br />
                {`본 약관은 개인정보보호법, 전기통신사업법 및 정보통신망 이용촉진 및 정보보호 등에 관한 법률에 의하여 (주)하우테리어(이하 "회사"라 한다)이 제공하는 회원 서비스(이하 "서비스"라 한다)의 이용 조건, 절차 그리 고 회원규칙에 관한 사항 등을 규정함을 목적으로 합니다.`}
                <br />
                {`제 2 조 (공지)`}
                <br />
                {`1. 본 규정은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력을 발생합니다.`}
                <br />
                {`2. 회사는 “개인정보보호법”, “약관의규제에관한법률”, “정보통신망이용촉진및정보보호등에관한법률” 등 관련법을 위배하지 않는 범위에서 본 규정을 변경할 수 있으며, 변경된 규정은 제1항과 같은 방법으로 공 지함으로써 효력을 발생합니다.`}
                <br />
                {`제 3 조 (약관 외 준칙)본 약관에 규정되지 않은 사항은 전기통신사업법 및 정보통신망 이용촉진 및 정보 보호 등에 관한 법률 기타 관련법령의 규정에 의합니다.`}
                <br />
                {`제 4 조 (용어의 정의)본 약관에서 사용하는 용어의 정의는 다음과 같습니다.`}
                <br />
                {`1. “이용자”이라 함은 회사와 서비스 이용계약을 체결한 자를 말합니다.`}
                <br />
                {`2. “이용자 ID”라 함은 “회원”의 식별과 서비스 이용을 위하여 “회원”이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.`}
                <br />
                {`3. “비밀번호”라 함은 이용자ID와 일치된 “회원”이 이용자임을 확인하고 “회원” 자신의 비밀을 보호하기 위하여 “회원” 자신이 설정한 문자와 숫자의 조합을 말합니다.`}
                <br />
                {`4. “운영자”라 함은 서비스의 전반적인 관리와 원활한 운영을 위하여 회사에서 선정한 사람을 말합니다.`}
                <br />
                <br />
                {`제 2 장 서비스 이용 계약`}
                <br />
                {`제 5 조 (이용계약의 성립)`}
                <br />
                {`1. 이용계약은 이용자가 이용 약관에 대한 "동의" 버튼을 클릭하면 이 약관에 동 의하는 것으로 간주하며, 이용자는 회원가입신청을 하여야 합니다.`}
                <br />
                {`2. 이용계약은 이용자의 가입 신청에 대하여 회사가 승낙함으로써 성립합니다.`}
                <br />
                {`제 6 조 (이용계약의 유보 및 거절)`}
                <br />
                {`1. 회사는 다음에 해당하는 경우에는 이용계약의 승낙을 유보할 수 있 습니다.`}
                <br />
                {`가. 서비스 설비용량에 여유가 없는 경우`}
                <br />
                {`나. 서비스를 제공하기에는 기술적으로 문제가 있다고 판단되는 경우`}
                <br />
                {`다. 기타 회사가 필요하다고 인정되는 경우`}
                <br />
                {`2. 회사는 다음에 해당하는 경우에는 이용계약의 승낙을 거절할 수 있습니다.`}
                <br />
                {`가. 본인 실명과 다르게 이용신청을 하였을 경우`}
                <br />
                {`나. 이용신청서의 내용을 허위로 기재하였거나 허위서류를 첨부하여 이용신청을 하였을 경우`}
                <br />
                {`제 7 조 (이용자ID 등의 관리)`}
                <br />
                {`1. 이용자ID는 본인실명으로 개인에게 하나만을 발급하는 것을 원칙으로 합니다.`}
                <br />
                {`2. 이용자ID는 본명(실명)이 이용자명과 연계되어야 합니다. 이용자ID를 소유한 이용자는 이용자ID 및 비 밀번호에 대한 관리 책임이 있으며, 서비스 이용상의 과실 또는 제 3자에 의한 부정사용 등으로 인해 발생하는 모든 불이익에 대해 책임을 져야 합니다. 다만 회사에 고의 또는 중대한 과실이 있는 경우에는 그 러하지 않습니다.`}
                <br />
                {`제 8 조 (이용계약사항의 변경)`}
                <br />
                {`1. 이용자는 다음에 해당하는 변경사항이 있을 경우에는 개인정보관리화면을 통하여 언제든지 본인의 개인 정보를 열람하고 수정할 수 있습니다. 단, 이러한 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다.가. 주소 및 전화번호`}
                <br />
                {`나. 비밀번호`}
                <br />
                {`다. 기타 회사가 인정하는 사항`}
                <br />
                {`2. 이용자ID는 다음에 해당할 경우 이용자의 요청에 의하여 변경할 수 있습니다.`}
                <br />
                {`가. 이용자의 전화번호, 주민등록번호 등으로 등록되어 사생활 침해가 우려되는 경우 나. 타인에게 혐오감을 주는 경우`}
                <br />
                {`다. 기타 회사가 인정하는 경우`}
                <br />
                <br />
                {`제 3 장 서비스 이용`}
                <br />
                {`제 9 조 (회사의 의무)회사는 서비스 제공과 관련해서 알고 있는 이용자의 신상정보를 본인의 승낙 없이 제 3자에게 누설, 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 정보통신윤리위원회의 요청이 있는 경우 또는 기타 관계법령에 서 정한 절차에 따른 요청이 있는 경우에는 그러하지 않습니다.`}
                <br />
                {`제 10 조 (이용자의 이용자 ID와 비밀번호 관리에 대한 의무)1. 이용자 ID와 비밀번호에 관한 모든 관리 책임은 이용자에게 있습니다. 이용자 ID와 비밀번호의 관리 소홀, 부정사용 등에 의하여 발생하는 모든 결 과에 대한 책임은 이용자에게 있습니다.`}
                <br />
                {`2. 자신의 이용자 ID와 비밀번호가 부정하게 사용되고 있음을 발견한 이용자는 즉시 회사에 그 사실을 통 보해야 합니다.`}
                <br />
                {`제 11 조 (서비스 전반에 관한 이용자의 의무)`}
                <br />
                {`1. 이용자는 서비스 이용 시 다음 각 호의 행위를 하지 않아야 합니다.`}
                <br />
                {`① 다른 이용자의 이용자 ID를 부정하게 사용하는 행위`}
                <br />
                {`② 서비스에서 얻은 정보를 회사의 사전승낙 없이 이용자의 이용 외의 목적으로 복제하거나 출판 및 방송 등에 사용하거나 제3자에게 제공하는 행위`}
                <br />
                {`③ 제3자의 저작권 등 기타 권리를 침해하는 행위`}
                <br />
                {`④ 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등을 타인에게 유포하는 행위`}
                <br />
                {`⑤ 범죄와 결부된다고 객관적으로 판단되는 행위`}
                <br />
                {`⑥ 타인의 명예를 훼손하거나 불이익을 주는 행위`}
                <br />
                {`⑦ 기타 관계법령 및 본 약관을 위배하는 행위`}
                <br />
                {`2. 이용자는 본 약관에서 규정하는 사항과 회사가 서비스 이용안내 또는 주의사항 등 회사가 공지하는 사 항을 준수하여야 합니다.`}
                <br />
                {`3. 이용자는 회사의 사전승낙 없이는 서비스를 이용하여 영업활동을 할 수 없으며, 그 영업활동으로 인하 여 발생된 결과에 대하여 회사는 어떠한 책임도 지지 않습니다.`}
                <br />
                {`제 12 조 (서비스 이용시간)`}
                <br />
                {`1. 서비스의 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 1일 24시간, 연중 무휴서비스를 원칙으로 합니다. 다만, 시스템 점검, 교체, 보수 등과 같은 필요가 있는 경우는 그러하지 않습니다.`}
                <br />
                {`2. 회사는 서비스를 일정범위로 분할하여 각 범위별로 이용가능시간을 별도로 정할 수 있습니다.`}
                <br />
                {`제 13 조 (서비스 제공의 중지)`}
                <br />
                {`1. 회사는 전시사변, 천재지변 또는 이에 준하는 국가비상사태가 발생하거나 발생할 우려가 있는 경우와 전기통신사업법에 의한 기간통신사업자가 전기통신 서비스를 중지하는 등 기타 부득이한 사유가 있는 경 우에는 서비스의 전부 또는 일부를 제한하거나 정지할 수 있습니다.`}
                <br />
                {`2. 회사는 전 항의 규정에 의하여 서비스의 이용을 제한하거나 정지한 때에는 그의 사유 및 제한기간 등 을 지체 없이 이용자에게 공지합니다.`}
                <br />
                <br />
                {`제 4 장 계약 해지 및 이용 제한`}
                <br />
                {`제 14 조 (계약해지 및 이용제한)1. 이용자가 이용계약을 해지하고자 하는 때에는 본인이 온라인을 통해 회사에 해지신청을 하여야 합니다.`}
                <br />
                {`2. 회사가 서비스 이용을 제한하고자 하는 경우 그 사유와 일시 등을 이용자에게 통지합니다. 다만, 회사 가 긴급하게 이용을 정지할 필요가 있다고 인정하는 경우에는 바로 제재를 가할 수 있습니다.`}
                <br />
                {`3. 전 항의 규정에 의하여 이용정지를 통지 받은 이용자는 그 이용 정지의 통지에 대해 부당하다고 생각 할 경우 이의신청을 할 수 있습니다.`}
                <br />
                {`4. 회사는 전 항의 규정에 의한 이의신청에 대하여 그 확인을 위한 기간까지 이용정지를 일시 연기할 수 있으며, 그 경과와 결과를 이용 고객에게 통지합니다.`}
                <br />
                {`5. 회사는 이용정지 기간 중에 그 이용정지 사유가 해소된 것이 확인된 경우에는 이용정지 조치를 즉시 해제합니다.`}
                <br />
                <br />
                {`제 5 장 손해배상 등`}
                <br />
                {`제 15 조 (손해 배상)회사는 서비스가 무료인 동안 서비스 이용과 관련하여 이용자에게 발생한 손해에 대 하여는 어떠한 책임도 지지 않습니다. 서비스 유료화 이후에 관하여는 별도로 정합니다.`}
                <br />
                {`제 16 조 (면책조항)`}
                <br />
                {`1. 회사는 천재지변 기타 불가항력적인 사유로 인해 서비스를 제공할 수 없는 경우에는 서비스 제공중지 에 대한 책임이 면제 됩니다.`}
                <br />
                {`2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.`}
                <br />
                {`3. 회사는 이용자가 서비스를 이용하여 얻은 정보 등으로 인해 입은 손해 등에 대하여는 책임을 지지 않 습니다.`}
                <br />
                {`4. 회사는 회사의 서비스망을 통해 제공되는 IP 정보와 이용자가 게시하거나 전송한 정보 등의 신뢰도나 정확성에 대하여는 책임을 지지 않습니다.`}
                <br />
                {`제 17조 (준거법 및 재판관할)`}
                <br />
                {`1. 회사와 회원간 제기된 소송은 대한민국법을 준거법으로 합니다.`}
                <br />
                {`2. 회사와 회원간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다.`}
                <br />
                <br />
                {`[부칙] 이 약관은 공시일로부터 시행합니다.`}
              </div>

              <div className="row-text align-items-center mt-20">
                <Checkbox
                  className="mr-10"
                  size="lg"
                  round={true}
                  grayBorder
                  checked={agreeCollect}
                  onChange={() => {
                    setAgreeCollect(!agreeCollect);
                  }}
                />
                <div className="font-14 lh-25">
                  {t("Collection and use of personal information (required)")}
                </div>
              </div>
              <div className="font-14 mt-5 text-gray_2 pl-30 pt-15 pb-15 pr-50 bg-gray-1  br-10 h-400 scroll_y">
                {`(주)하우테리어는 회원 여러분을 위한 개인정보처리방침을 다음과 같이 알려드립니다.`}
                <br />
                <br />
                {`'(주)하우테리어'는 (이하 '회사'는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호에 관한 법률" 및 "개인정보보호법" 등 사업자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다.`}
                <br />
                {`회사는 개인정보처리방침을 통하여 회원님들께 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.`}
                <br />
                <br />
                <br />
                {`01. 수집하는 개인정보의 항목`}
                <br />
                {`회사는 회원가입, 상담, 서비스 신청, 분양계약 관리, 입주관리, AS 관리 등을 위해 아래와 같이 개인정보 를 수집하고 있습니다.`}
                <br />
                <br />
                {`회원가입, 상담, 서비스 신청`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`필수항목 : 이름, 로그인ID, 비밀번호, 이메일, 휴대전화, 주소`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`선택항목 : 일반전화, 메일링/SMS수신여부`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`수집방법 : 홈페이지(회원가입), 이벤트 응모, 설문조사`}
                <br />
                <br />
                {`인테리어 계약의 체결, 유지, 이행, 관리, 보수(AS)`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`수집항목 : 이름, 주민등록번호(주택공급에 관한 규칙 제23조 근거), 외국인등록번호(외국인일 경우), 연락처, 주소, 이메일`}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {`수집방법 : 특별공급신청, 공급계약 체결`}
                <br />
                {`인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.`}
                <br />
                {`수집항목 : 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 불량이용 기록`}
                <br />
                <br />
                {`02. 개인정보의 수집 목적`}
                <br />
                {`회사는 개인정보를 다음의 목적을 위해 수집하며 다음의 목적이외의 용도로 사용되지 않습니다. 이용 목적 이 변경되는 경우에는 개인정보보호법 제18조에 따라 필요한 조치를 이행할 예정입니다.`}
                <br />
                {`인테리어 계약의 체결, 유지, 이행, 관리, 보수(AS)`}
                <br />
                {`본인확인, 각종 서류 발급, 계약 관련 안내, 불만처리 등 민원처리, 고지사항 전달 등 인테리어 계약과 관 련된 행위 일체`}
                <br />
                {`마케팅 및 광고에 활용`}
                <br />
                {`이벤트 등 광고성 정보 전달 및 참여기회 제공, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계 기타`}
                <br />
                {`서비스 제공에 관한 계약 이행 및 서비스 제공`}
                <br />
                <br />
                {`03. 개인정보의 처리 및 보유기간`}
                <br />
                {`회사는 정보주체로부터 개인정보 수집 시 동의 받은 개인정보 처리, 보유기간 또는 주택 법, 상법, 전자상 거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존해야 하는 경우 관계법령에서 정한 일정 기간 동안 정보주체의 개인정보를 보유합니다. 상기 보유 기간이 지난 후에는 해당 정보를 지체 없이 파기합니다.`}
                <br />
                {`[고객의 불만 또는 민원 회신 등]`}
                {`- 보존 기간 : 3년`}
                <br />
                {`[인테리어계약 관련]`}
                <br />
                {`- 보존 기간 : 5년`}
                <br />
                <br />
                {`04. 개인정보처리 위탁회사는 원활한 업무처리를 위하여 아래와 같은 업무를 외부 전문 업체에 처리 위탁 하여 운영하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항 을 규정하고 있습니다.`}
                <br />
                <br />
                {`위탁업무내용 및 위탁업체 보기 >`}
                <br />
                <br />
                {`05. 정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항`}
                <br />
                {`정보주체(만 14세 미만인 경우에는 법정대리인을 말함)는 언제든지 등록되어 있는 자신의 개인정보를 조회 하거나 수정할 수 있으며 회사의 개인정보의 처리에 동의하지 않는 경우 동의를 거부하거나 가입해지를 요청할 수도 있습니다. 다만, 그러한 경우 서비스의 일부 또는 전부 이용이 어려울 수 있습니다.`}
                <br />
                {`상기 권리 행사는 개인정보보호법 시행규칙 별지 제8호 서식에 따라 작성 후 서면, 전화 또는 전자우편 등을 통해 요청하는 방법 및 당사 홈페이지 내 ‘개인정보변경’(또는 ‘회원정 보수정’ 등), “회원탈퇴”를 클 릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 및 탈퇴 하는 방법이 있습니다.`}
                <br />
                {`귀하가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지 체 없이 통지하여 정정이 이루어지도록 하겠습니다. 회사는 이용자의 요청에 의해 해지 또는 삭제된 개인 정보는 “회사가 수집하는 개인정보의 보유 및 이용기간”에 명시된 바에 따라 처리하고 그 외의 용도로 열 람 또는 이용할 수 없도록 처리하고 있습니다.`}
                <br />
                <br />
                {`06. 개인정보 파기 절차 및 방법`}
                <br />
                {`회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다 만, 다른 법률에 따라 보존하여야하는 경우에는 그러하지 않습니다. 회사의 개인정보 파기절차 및 방법은 다음과 같습니다.`}
                <br />
                {`파기절차`}
                <br />
                {`인테리어 계약의 체결을 위해 수집된 개인정보(분양계약서) 및 회원가입 등을 위해 입력하신 정보는 목적 이 달성된 후 재생할 수 없는 방법에 의하여 완전히 삭제하며, 추후 열람이나 이용이 불가능한 상태로 파 기됩니다.`}
                <br />
                {`파기방법`}
                <br />
                {`전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 문서 형태의 개인정보는 분쇄기로 분쇄하여 파기합니다.`}
                <br />
                <br />
                {`07. 개인정보의 안전성 확보 조치`}
                <br />
                {`회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적, 관리적, 물리적 조치를 하고 있습니다.`}
                <br />
                {`개인정보 처리자 교육 실시`}
                <br />
                {`개인정보를 처리하는 담당자를 대상으로 연1회 이상 개인정보보호 교육을 실시하며, 담당자를 최소화하여 개인정보를 관리하고 있습니다.`}
                <br />
                {`개인정보에 대한 접근 제한`}
                <br />
                {`개인정보를 처리하는 데이터베이스시스템에 대한 접근권한 부여, 변경, 말소는 당사 내부 지침에 의하여 개인정보에 대한 접근통제를 위해 필요한 조치를 하고 있습니다.`}
                <br />
                {`개인정보의 암호화`}
                <br />
                {`정보주체의 개인정보는 암호화 되어 저장 및 관리되고 있습니다. 또한 중요한 데이터는 저장 및 전송 시 암호화할 수 있는 별도의 보안기능을 사용하고 있습니다.`}
                <br />
                {`해킹 등에 대비한 기술적 대책`}
                <br />
                {`회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안 프로그램을 설치 하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적, 물리적으로 감시 및 차단하고 있습니다.`}
                <br />
                <br />
                {`08. 개인정보 자동수집 장치와 설치, 운영 및 그 거부에 관한 사항`}
                <br />
                {`회사는 귀하의 정보를 수시로 저장하고 찾아내는 ‘쿠키(cookie)’ 등을 운용합니다. 쿠키란 웹사이트를 운영 하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크 에 저장됩니다. 회사는 다음 과 같은 목적을 위해 쿠키를 사용합니다.`}
                <br />
                {`쿠키 등 사용 목적`}
                <br />
                {`회원과 비회원의 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스를 제공합니다. 또한, 귀 하는 쿠키 설치에 대한 선택권을 가지고 있습니 다. 따라서, 귀하는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.`}
                <br />
                {`쿠키 설정 거부 방법`}
                <br />
                {`예시) 쿠키 설정을 거부하는 방법으로는 회원님이 사용하시는 웹 브라우저의 옵션을 선택 함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 설정방법`}
                <br />
                {`예시) 인터넷 익스플로어의 경우 : 웹 브라우저 상단의 도구 >인터넷 옵션 >개인정보 단, 귀하께서 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.`}
                <br />
                <br />
                {`09. 고지의 의무`}
                <br />
                {`현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 홈페 이지의 '공지사항 '을 통해 고지할 것입니다. 다만, 개인정보의 수집 및 활용, 제3자 제공 등과 같이 이용자 권리의 중요한 변경이 있 을 경우에는 최소 30일 전에 고지합니다.`}
                <br />
                <br />
                {`10. 개인정보에 관한 민원서비스`}
                <br />
                {`회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를 지정하고 있습니다.`}
                <br />
                {`[개인정보 보호책임자]`}
                <br />
                {`- 성명 : 한진상`}
                <br />
                {`- 직책 : 대표이사`}
                <br />
                {`[개인정보 보호업무 및 고충사항 처리 부서]`}
                <br />
                {`- CS팀 : 02-2288-2415`}
                <br />
                {`[권익침해 구제방법]`}
                <br />
                {`정보주체는 개인정보침해로 인한 구제를 받기 위해 개인정보분쟁조정위원회, 한국인터넷 진흥원 개인정보 침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이밖에 기타 개인정보침해의 신고, 상담 에 대하여는 아래 기관에 문의하시기 바랍니다.`}
                <br />
                {`1. 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)`}
                <br />
                {`2. 대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)`}
                <br />
                {`3. 경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182)`}
                <br />
                <br />
                {`11. 개인정보처리방침의 변경본 방침은 2021년 7월 21일부터 시행됩니다.`}
              </div>
              {/* <div className="row-text align-items-center mt-20">
                <Checkbox
                  className="mr-10"
                  size="lg"
                  round={true}
                  grayBorder
                  checked={joinInfo?.agree_use}
                  onChange={() => {
                    dispatch(
                      setJoinInfo({
                        ...joinInfo,
                        agree_use: !joinInfo.agree_use,
                      })
                    );
                  }}
                />
                <div className="font-14 lh-25">
                  {t("Entrustment of Personal Information Handling (Optional)")}
                </div>
              </div>
              <div className="font-14 mt-5 text-gray_2 pl-30 pt-15 pb-15 pr-50 bg-gray-1  br-10">
                {t("Agree to terms and conditions_text")}
              </div>
              <div className="row-text align-items-center mt-20">
                <Checkbox
                  className="mr-10"
                  size="lg"
                  round={true}
                  grayBorder
                  checked={joinInfo?.agree_marketing}
                  onChange={() => {
                    dispatch(
                      setJoinInfo({
                        ...joinInfo,
                        agree_marketing: !joinInfo.agree_marketing,
                      })
                    );
                  }}
                />
                <div className="font-14 lh-25">
                  {t("Leverage marketing information (optional)")}
                </div>
              </div>
              <div className="font-14 mt-5 text-gray_2 pl-30 pt-15 pb-15 pr-50 bg-gray-1  br-10">
                {t("Agree to terms and conditions_text")}
              </div>
              <div className="row-text align-items-center mt-20">
                <Checkbox
                  className="mr-10"
                  size="lg"
                  round={true}
                  grayBorder
                  checked={joinInfo?.agree_location}
                  onChange={() => {
                    dispatch(
                      setJoinInfo({
                        ...joinInfo,
                        agree_location: !joinInfo.agree_location,
                      })
                    );
                  }}
                />
                <div className="font-14 lh-25">
                  {t("Accept location-based collection (optional)")}
                </div>
              </div>
              <div className="font-14 mt-5 text-gray_2 pl-30 pt-15 pb-15 pr-50 bg-gray-1  br-10">
                {t("Agree to terms and conditions_text")}
              </div> */}
              <div className="row justify-content-center mt-70">
                <button className="prev_button mr-30" onClick={prevStage}>
                  {t("Previous")}
                </button>
                <button
                  disabled={!agreeAge || !agreeClause || !agreeCollect}
                  className="next_button border-0px"
                  onClick={nextStage}
                >
                  {t("next")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default TermsAndConditions;
