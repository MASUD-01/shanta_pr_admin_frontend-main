import { api } from "../../../app/api/userApi/api";
import { HTTPResponse } from "../../../app/utils/commonTypes";
import { IViewAuditTrails } from "../types/reportTypes";

export const auditTrailsEndPoint = api.injectEndpoints({
  endpoints: (build) => ({
    getAuditTrail: build.query<HTTPResponse<IViewAuditTrails[]>, any>({
      query: (params) => {
        return {
          url: `/erp/admin/audit-trail`,
          params,
        };
      },
    }),
  }),
});

export const { useGetAuditTrailQuery } = auditTrailsEndPoint;
