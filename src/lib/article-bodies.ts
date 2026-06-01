import type { ArticleBlock } from "./types";

function p(text: string): ArticleBlock {
  return { _type: "block", style: "normal", children: [{ text }] };
}

function h2(text: string): ArticleBlock {
  return { _type: "block", style: "h2", children: [{ text }] };
}

function quote(text: string): ArticleBlock {
  return { _type: "pullQuote", text };
}

export const ARTICLE_BODIES: Record<string, ArticleBlock[]> = {
  "morocco-gen-z-protests": [
    p(
      "In September and October 2025, Morocco witnessed the largest youth-led demonstrations since 2011. Thousands of young Moroccans, mobilized primarily through the Gen Z 212 network, filled the streets of Agadir, Rabat, Casablanca, Tangier, and Marrakesh demanding jobs, education reform, and an end to corruption.",
    ),
    p(
      "As The New Arab reported, the Gen Z protests mirror similar unrest sweeping countries like Nepal, Kenya, and Madagascar. Demonstrators have harnessed anger about conditions in hospitals and schools to express outrage over the government’s spending priorities.",
    ),
    quote(
      "The right to health, education and a dignified life is not an empty slogan but a serious demand.",
    ),
    h2("A new script for youth power"),
    p(
      "Morocco’s Gen Z is not replaying the script of the Arab Spring. Their approach reflects a new mode of political engagement grounded in digital coordination, horizontal decision-making, and a moral language of dignity. Earlier movements often relied on political parties, unions, or established civil society groups. Gen Z 212 operates without formal leaders—a structure that protects participants from repression and reflects global shifts in youth activism.",
    ),
    p(
      "Social media transformed localized frustration into a nationwide uprising. In a widely disseminated Discord statement, organizers condemned “repressive security approaches” while urging peaceful mobilization. The framing is intentional: the movement anchors itself in universal rights rather than partisan agendas.",
    ),
    h2("From Agadir to the palace"),
    p(
      "The immediate catalyst was a tragic incident: the deaths of several women in an under-resourced hospital in Agadir. The tragedy crystallized anger about failing public services and deepening inequality. The slogan “We are the youth, we are not parasites” captured a generational rejection of narratives that long dismissed young Moroccans as apathetic.",
    ),
    p(
      "More than two thousand people were arrested nationwide, including minors. Without transparent investigations, many young Moroccans interpreted official statements as an attempt to delegitimize their movement. For the monarchy and government, heavy repression risks radicalizing a generation that forms the demographic core of the country; concessions risk encouraging future protests.",
    ),
    p(
      "Similar youth-centered protests in Kenya, Nepal, and Madagascar highlight a global generational convergence around demands for dignity, transparency, and economic opportunity. Morocco’s protests have drawn attention in Algeria and Tunisia, where young people face comparable structural pressures—the ingredients for cross-border inspiration remain strong.",
    ),
  ],
  "shutdown-showdown": [
    p(
      "On Wednesday, October 1, 2025, the federal government entered a shutdown after Congress failed to pass an appropriations bill. This shutdown entered its 37th day, becoming the longest in United States history—surpassing the 35-day shutdown during President Trump’s first term in 2018–2019.",
    ),
    p(
      "During a shutdown, non-mandatory programs stop operating and most agencies function with limited staff. Nearly one million employees are either furloughed or expected to work without initial pay. Childcare programs and food assistance pause; for the 42 million Americans who benefit from SNAP and the 716,000 children in Head Start, these pauses are devastating.",
    ),
    h2("Blame games in Washington"),
    p(
      "Both parties claim the other is at fault. Democrats argue that Republicans control Congress and the presidency; Republicans argue that Democrats are unwilling to budge on health care provisions in the continuing resolution. On the White House website, a banner reads “Democrats Have Shut Down the Government for:” followed by a running clock—a partisan message on what should be a neutral government portal.",
    ),
    quote(
      "Despite one’s political beliefs, the shutdown is objectively bad. Its effects are seen throughout the country, hitting some of the poorest Americans.",
    ),
    p(
      "The House passed a continuing resolution, but the Senate requires 60 votes to end debate. President Trump repeatedly urged Republicans to eliminate the filibuster via Truth Social, while Majority Leader John Thune defended the 60-vote threshold as having “protected this country.”",
    ),
    p(
      "Air traffic disruptions, mortgage delays, and rising Obamacare premiums spread the pain beyond federal workers. To quote Senate Chaplain Barry Black, “no gold medals are given for breaking shutdown records, but a crown of righteousness is given to those who take care of the lost.”",
    ),
  ],
  "market-correction-threat": [
    p(
      "In April and May of 2025, developments in both the U.S. Treasury and equity markets revealed underlying stresses beneath relatively calm index performances. A correction—defined as a decline of at least 10% from a recent high—had not yet occurred in major indexes, yet the conditions necessary for one were steadily accumulating.",
    ),
    h2("Treasury strains"),
    p(
      "Treasury bonds serve as the cornerstone of the global financial system. In early 2025, evidence mounted that demand for Treasuries was shifting: foreign governments and institutional investors, traditionally the most stable buyers, were purchasing fewer long-term bonds and demanding higher yields. That did not signal immediate crisis, but it did signal that the market was becoming more sensitive and more expensive to sustain.",
    ),
    p(
      "Higher Treasury yields transmit throughout the financial system. When the U.S. government pays more to issue debt, banks, corporations, and households face a more expensive environment for raising capital. Treasuries become more attractive relative to stocks, redirecting capital away from equities and pressuring corporate profitability.",
    ),
    h2("Concentration risk"),
    p(
      "Equity valuations had climbed well above historical averages. The so-called “Magnificent Seven” accounted for roughly one-third of the S&P 500’s total market value, meaning the health of the index relied disproportionately on a handful of firms. Margin debt remained high, increasing the speed at which losses could accelerate if prices dropped.",
    ),
    quote(
      "So if the market’s pricing in 10%, I would say it is more like 30%—the level of uncertainty should be higher in most people’s minds than what I would call normal.",
    ),
    p(
      "What occurred in April and May was not a dramatic break but a critical revelation: both central pillars of the U.S. financial system—Treasuries and equities—were being sustained by conditions that were steadily weakening. The IMF explicitly warned that U.S. shares risk a “sharp correction” even as markets appeared complacent.",
    ),
  ],
  "higher-education-compact": [
    p(
      "On October 1, 2025, the Trump Administration sent a 10-point memo called the “Compact for Academic Excellence in Higher Education” to nine American universities, including MIT, Dartmouth, and the University of Pennsylvania. The letter invited institutions to sign in exchange for benefits such as additional federal funding.",
    ),
    p(
      "The compact’s admissions and hiring clauses require institutions to avoid considering race, ethnicity, gender identity, sexual orientation, religion, or political view when admitting students or hiring faculty. Applicants must take standardized tests; universities must publish admissions data for admitted and rejected students.",
    ),
    h2("Campus culture and autonomy"),
    p(
      "The compact invokes a “marketplace of ideas” where no dominant ideology prevails, caps international undergraduate enrollment at 15% of the student body (no more than 5% from a single country), and requires disclosure of foreign funding and monitoring of grade inflation.",
    ),
    quote(
      "Critics raised numerous red flags, particularly on threats posed to academic freedom and university autonomy.",
    ),
    p(
      "If universities were forced to sign, access to federal research funds could become tied to ideological conformity. For high schools like Lawrenceville, students will face new challenges navigating admissions at institutions deciding whether to accept or reject the compact—and what “excellence” means in a politicized landscape.",
    ),
  ],
  "brown-bold-refusal": [
    p(
      "Brown University announced on October 15, 2025 that it would reject the preferential funding policy proposed in the administration’s higher-education compact—an act of defiance against federal attempts to reshape private schools’ education systems.",
    ),
    p(
      "The compact offered benefits such as priority access to federal research grants and temporary relief from federal excise taxes. In exchange, universities would cap international undergraduate enrollment, ban consideration of race or sex in admissions and scholarships, and define gender strictly according to biological criteria.",
    ),
    quote(
      "Federal research support must remain tied to the quality and impact of scholarship, not to political conditions.",
    ),
    p(
      "President Christina Paxson wrote to Education Secretary Linda McMahon that the compact “would restrict academic freedom and undermine the autonomy of Brown’s governance.” By turning down the compact, Brown reaffirmed educational independence at the cost of losing potential federal support.",
    ),
    h2("Who can afford to say no?"),
    p(
      "Only Brown, MIT, and Penn initially declined among universities heavily dependent on federal grants from agencies like NIH and NSF. Other institutions may wait for court rulings before deciding publicly. Brown’s relative financial and political independence allowed a clearer “no” than many peers could risk.",
    ),
    p(
      "The episode is a reminder that education must remain subject to intellectual independence rather than political expedience—and that the stakes extend far beyond any single campus.",
    ),
  ],
  "china-hanwha-sanctions": [
    p(
      "In October 2025, China sanctioned five U.S.-linked subsidiaries of South Korea’s Hanwha Ocean, escalating a dispute rooted in shipbuilding, trade, and alliance politics. Beijing’s Ministry of Transport declared it would target entities that “assist or support discriminatory measures imposed by the U.S. against China.”",
    ),
    p(
      "Hanwha Ocean is one of the world’s largest shipbuilders. Its Philadelphia shipyard holds a multibillion-dollar order backlog and aligns with Washington’s push to revitalize U.S. maritime industry. Hanwha’s cooperation with a U.S. Section 301 investigation into China’s shipbuilding dominance crossed a political line in Beijing’s view.",
    ),
    h2("Coercion and backlash"),
    p(
      "Hanwha Ocean’s shares fell sharply on the day of the announcement. Analysts noted that deep involvement in U.S. manufacturing “could easily turn into a political risk” even without formal sanctions—American shipbuilding remains extraordinarily expensive compared to Asian competitors.",
    ),
    quote(
      "Coercion often backfires by accelerating economic decoupling and alliance coordination.",
    ),
    p(
      "Following earlier episodes—from rare earths to THAAD—Seoul has diversified export markets and strengthened defense ties with Washington. For the region as a whole, economic tools have become the newest front in an unfolding struggle over maritime power and technological sovereignty.",
    ),
    p(
      "China’s move to penalize Hanwha may satisfy nationalist audiences and demonstrate resolve, but it also underscores the fragility of Beijing’s interdependence with U.S. allies—and validates a strategy of collective defense in industrial policy, not only in the military realm.",
    ),
  ],
  "georgia-voters-matter": [
    p(
      "Georgia has become one of the most closely watched states in American politics. From razor-thin presidential margins to high-stakes Senate races, the question of who votes—and whether every vote is counted equally—shapes national outcomes.",
    ),
    quote("Georgia voters matter—not only on election night, but in the years of policy that follow."),
    p(
      "This piece examines how voting rights, turnout, and representation interact in a state that often decides which party controls Washington.",
    ),
  ],
  "gerrymandering-do-all-votes-count": [
    p(
      "As Texas and California engage in a mid-century redistricting war, aggressive gerrymandering could distort 2026 midterms. When districts are drawn for partisan advantage rather than fair representation, voters see their power diluted before they reach the ballot box.",
    ),
    quote("If one political party gets too much power, they will use it and take control of the American political system."),
    p(
      "Independent redistricting commissions offer one path back toward fairness—if lawmakers can agree to cede control of the map-making process.",
    ),
  ],
  "explaining-the-indictments": [
    p(
      "A wave of high-profile investigations into former Trump critics has raised questions about the independence of federal law enforcement. Cases involving James Comey, Letitia James, John Bolton, and Jack Smith sit at the center of a broader debate over whether justice is being weaponized for political ends.",
    ),
    p(
      "Understanding these indictments requires separating legal process from partisan narrative—and asking what standards Americans expect when the Department of Justice weighs charges against public figures.",
    ),
  ],
  "nepal-digital-blackout": [
    p(
      "Nepal’s social media blackout and subsequent violent uprising fit within a global pattern: when states restrict information, youth movements often respond with greater intensity. Digital authoritarianism does not always silence dissent; it can accelerate it.",
    ),
    p(
      "Angela Lo connects Nepal’s crisis to similar dynamics across Asia, where control over platforms has become a front line in struggles between governments and Gen Z protesters.",
    ),
  ],
  "venezuela-oil-politics": [
    p(
      "Venezuela’s vast oil reserves have long made it a focal point of U.S. foreign policy. Sanctions, recognition battles, and energy markets intertwine in a relationship defined as much by economics as by ideology.",
    ),
    p(
      "This analysis traces how oil shapes leverage between Washington and Caracas—and what that means for regional stability.",
    ),
  ],
  "battle-for-taiwan": [
    p(
      "Taiwan sits at the intersection of semiconductor supply chains, maritime power, and great-power competition. Economic coercion and military signaling from Beijing have made the island a test case for how the U.S. and its allies respond to pressure short of war.",
    ),
    p(
      "The battle for Taiwan is fought in trade policy, shipbuilding, and investor confidence as much as in the Taiwan Strait.",
    ),
  ],
  "usmca-trade-deal": [
    p(
      "The USMCA redefined North American trade after NAFTA, but its future is contested. Labor standards, supply chains, and political rhetoric in all three capitals continue to shape whether the agreement delivers on its promises.",
    ),
    p(
      "Bella Wu examines what USMCA means for workers and industries caught between integration and protectionism.",
    ),
  ],
  "epstein-network": [
    p(
      "Years after Jeffrey Epstein’s death, questions about accountability, elite networks, and institutional failure remain unresolved. New disclosures and investigations keep the case in the public eye—not as gossip, but as a test of whether power faces consequences.",
    ),
    p(
      "This feature explores what the Epstein network reveals about justice, media, and political culture in America.",
    ),
  ],
  "sudan-silent-stalemate": [
    p(
      "Sudan’s civil conflict has produced a humanitarian catastrophe that often disappears from headlines. Protest, military rule, and international inaction have created a stalemate that punishes civilians most of all.",
    ),
    p(
      "Jennifer Kim asks why global attention fades—and what responsibility outside powers bear for ending the violence.",
    ),
  ],
  "nj-gubernatorial-race": [
    p(
      "New Jersey’s gubernatorial race offers a window into suburban politics, state fiscal policy, and the national parties’ strategies ahead of 2026. With the state’s map and demographics in flux, the outcome may signal trends beyond Trenton.",
    ),
    p(
      "Phoebe Rayner profiles the stakes for voters and for both parties.",
    ),
  ],
  "kristi-noem-firings": [
    p(
      "High-profile dismissals in the executive branch raise questions about loyalty, competence, and the boundaries of presidential power. The controversy surrounding Kristi Noem is one episode in a broader pattern of rapid turnover and public conflict.",
    ),
    p(
      "This piece situates personnel politics within the administration’s larger approach to governance.",
    ),
  ],
  "india-eu-trade-pact": [
    p(
      "A deepening trade partnership between India and the European Union could reshape supply chains and strategic alignments across Eurasia. For the U.S., the pact is both an economic development and a geopolitical signal.",
    ),
    p(
      "Bella Wu explains the pact’s winners, losers, and implications for American foreign policy.",
    ),
  ],
};
