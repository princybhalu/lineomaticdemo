import React from 'react';
import SvgAccount from '../shared/svg/svg-account';
import SvgHr from '../shared/svg/svg-hr';
import SvgIT from '../shared/svg/svg-it';
import SvgSaleMarketing from '../shared/svg/svg-sale-marketing';
import SvgPurches from '../shared/svg/svg-purches';
import SvgErp from '../shared/svg/svg-erp';
import SvgCsd from '../shared/svg/svg-csd';
import SvgAutomation from '../shared/svg/svg-automation';
import SvgAssemblyProduction from '../shared/svg/svg-assembly-production';
import SvgStores from '../shared/svg/svg-stores';
import SvgQualityCheck from '../shared/svg/svg-quality-check';
import SvgDesign from '../shared/svg/svg-design';
import SvgResearch from '../shared/svg/svg-research';
import SvgAccountFinance from '../shared/svg/svg-account-finance';
import SvgQa from '../shared/svg/svg-qa';

function DashboardCards() {
  return (
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-1.5 px-0 py-0  ">
      <div class="rounded-xl">
        <SvgAccount />
      </div>
      <div class="rounded-xl">
      <SvgHr />
      </div>
      <div class="rounded-xl">
        <SvgIT />
      </div>
      <div class="rounded-xl">
        <SvgSaleMarketing />
      </div>
      <div class="rounded-xl">
        <SvgPurches />
      </div>
      <div class="rounded-xl">
        <SvgErp />
      </div>
      <div class="rounded-xl">
        <SvgCsd />
      </div>
      <div class="rounded-xl">
        <SvgAutomation />
      </div>
      <div class="rounded-xl">
        <SvgAssemblyProduction />
      </div>
      <div class="rounded-xl">
        <SvgStores />
      </div>
      <div class="rounded-xl">
        <SvgQualityCheck />
      </div>
      <div class="rounded-xl">
        <SvgDesign />
      </div>
      <div class="rounded-xl">
        <SvgResearch />
      </div>
      <div class="rounded-xl">
        <SvgAccountFinance />
      </div>
      <div class="rounded-xl">
        <SvgQa />
      </div>
    </div>
  );
}

export default DashboardCards;
