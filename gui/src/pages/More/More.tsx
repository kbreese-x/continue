import {
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  DocumentArrowUpIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { vscBackground } from "../../components";
import KeyboardShortcuts from "./KeyboardShortcuts";
import { IdeMessengerContext } from "../../context/IdeMessenger";
import { useNavigationListener } from "../../hooks/useNavigationListener";
import { useDispatch } from "react-redux";
import { setOnboardingCard } from "../../redux/slices/uiStateSlice";
import useHistory from "../../hooks/useHistory";
import MoreHelpRow from "./MoreHelpRow";
import IndexingProgress from "./IndexingProgress";

function MorePage() {
  useNavigationListener();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ideMessenger = useContext(IdeMessengerContext);
  const { saveSession } = useHistory(dispatch);

  return (
    <div className="overflow-y-scroll">
      <div
        onClick={() => navigate("/")}
        className="items-center flex m-0 p-0 sticky top-0 cursor-pointer border-0 border-b border-solid border-b-zinc-700 bg-inherit"
        style={{
          backgroundColor: vscBackground,
        }}
      >
        <ArrowLeftIcon className="inline-block ml-3 cursor-pointer w-3 h-3" />
        <span className="text-sm font-bold m-2 inline-block">Chat</span>
      </div>

      <div className="px-4 divide-y-2 divide-y divide-zinc-700 divide-solid divide-x-0 gap-2">
        <div className="py-5">
          <div>
            <h3 className="mx-auto text-xl mb-1 mt-0">@codebase index</h3>
            <span className="text-xs text-stone-500 w-3/4">
              Local embeddings of your codebase
            </span>
          </div>
          <IndexingProgress />
        </div>
        
        {/* <div className="py-5">
          <h3 className="text-xl mb-4 mt-0">Help center</h3>
          <div className="flex flex-col gap-5">
            <MoreHelpRow
              title="Documentation"
              description="Learn how to configure and use Continue"
              Icon={ArrowTopRightOnSquareIcon}
              onClick={() =>
                ideMessenger.post("openUrl", "https://docs.continue.dev/")
              }
            />
            <MoreHelpRow
              title="Token usage"
              description="Daily token usage across models"
              Icon={TableCellsIcon}
              onClick={() => navigate("/stats")}
            />
          </div>
        </div> */}

        <div className="py-5">
          <h3 className="text-xl mb-4 mt-0">Help center</h3>
          <div className="flex flex-col gap-5">
           
            <MoreHelpRow
              title="Tutorial"
              description="Learn how to use the AI Codebot"
              Icon={DocumentArrowUpIcon}
              onClick={() => {
                navigate("/");
                // Used to clear the chat panel before showing onboarding card
                saveSession();
                // dispatch(setOnboardingCard({ show: true, activeTab: "Best" }));
                ideMessenger.post("showTutorial", undefined);
              }}
            />

            <MoreHelpRow
              title="Give feedback"
              description="Have an issue? Want to see a new feature? Let us know and we'll do our best to resolve it!"
              Icon={ArrowTopRightOnSquareIcon}
              onClick={() =>
                ideMessenger.post(
                  "openUrl",
                  "https://forms.office.com/r/BEHVNtUETS",
                )
              }
            />

            {/* <MoreHelpRow
              title="Join the community!"
              description="Join the group chat on Teams to connect with other users, get help, and stay up to date on future updates"
              Icon={ArrowTopRightOnSquareIcon}
              onClick={() =>
                ideMessenger.post("openUrl", "https://discord.gg/vapESyrFmJ")
              }
            /> */}

          </div>
        </div>

        <div>
          <h3 className="mx-auto text-lg mb-1">Keyboard shortcuts</h3>
          <KeyboardShortcuts />
        </div>
      </div>
    </div>
  );
}

export default MorePage;
